import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
import NotFound from './pages/NotFound.js';
import MainLayout from './component/layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import { UserProvider } from './context/UserContext.js';

import 'react-toastify/dist/ReactToastify.min.css';

const router = createBrowserRouter([
   {
      element: <MainLayout />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
      ],
   },
   {
      path: '/signup',
      element: <SignUp />,
   },
   {
      path: '/signin',
      element: <SignIn />,
   },
   {
      path: '*',
      element: <NotFound />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <UserProvider>
      <React.StrictMode>
         <RouterProvider router={router} />
      </React.StrictMode>
   </UserProvider>
);
