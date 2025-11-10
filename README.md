host - контейнер, который в себя включает остальные микрофронты (admin и shop)

в главном package.json:
// подключаем наши пакеты и сервисы
  "workspaces": [
    "packages/*",
    "services/*"
  ]

в package.json сервиса host:
"dependencies": {
    // указываем те пакеты, которые нужно заиспользовать здесь из других микросервисов, ри этом названия берем из package.json пакетов (звездочка говорит, что берем любую версию пакета)
    "@packages/shared": "*",
    "@packages/build-config": "*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0"
  },