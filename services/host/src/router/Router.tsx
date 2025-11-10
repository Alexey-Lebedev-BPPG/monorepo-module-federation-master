import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
// @ts-ignore
import shopRoutes from 'shop/Router';
// @ts-ignore
import adminRoutes from 'admin/Router';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // добавляем роуты из других сервисов
        children: [
            ...shopRoutes,
            ...adminRoutes,
        ]
    },
]);