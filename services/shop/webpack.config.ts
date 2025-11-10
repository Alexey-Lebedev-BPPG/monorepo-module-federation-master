import path from 'path';
import webpack from 'webpack';
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack, BuildOptions} from '@packages/build-config'
import packageJson from './package.json'

interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3001,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'shop',
        // название файла, который будет удаленно подключаться в host контейнер
        filename: 'remoteEntry.js',
        // указываем, что мы предоставляем host контейнеру
        exposes: {
            './Router': './src/router/Router.tsx',
        },
        // указываем, какие библиотеки общие, а какие должны шариться
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                // показывает, что библиотеку нужно подгрузить немедленно
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config;
}

