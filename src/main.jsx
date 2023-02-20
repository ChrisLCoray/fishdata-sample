import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './index.css';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error';
import Location, { loader as locationLoader } from './routes/location';
import MainView, { loader as mainViewLoader } from './routes/mainview';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        children: [
            {
                path: '/',
                element: <MainView />,
                loader: mainViewLoader,
            },
            {
                path: 'locations/:locationId',
                element: <Location />,
                loader: locationLoader,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
