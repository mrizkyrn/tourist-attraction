import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
import NotFound from './pages/NotFound.js';
import MainLayout from './component/layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import './index.css';

import 'react-toastify/dist/ReactToastify.min.css';
import UserList from './pages/UserList.js';
import UpdateUser from './pages/UpdateUser.js';
import ChangePassword from './pages/ChangePassword.js';
import CreateTouristAttraction from './pages/CreateTouristAttraction.js';
import SearchTouristAttractions from './pages/SearchTouristAttraction.js';
import TouristAttractionDetail from './pages/TouristAttractionDetail.js';
import UpdateTouristAttraction from './pages/UpdateTouristAttraction.js';
import ApprovalTouristAttraction from './pages/ApprovalTouristAttraction.js';
import Approval from './component/tourist-attractions/TouristAttractionApproval.js';
import ApprovalHistory from './component/tourist-attractions/ApprovalHistory.js';
import Favorites from './pages/Favorites.js';
import ApprovalDetail from './pages/ApprovalDetail.js';

const router = createBrowserRouter([
   {
      path: '/signup',
      element: <SignUp />,
   },
   {
      path: '/signin',
      element: <SignIn />,
   },
   {
      element: <MainLayout />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/edit-profile',
            element: <UpdateUser />,
         },
         {
            path: '/change-password',
            element: <ChangePassword />,
         },
         {
            path: '/user-list',
            element: <UserList />,
         },
         {
            path: '/create-tourist-attraction',
            element: <CreateTouristAttraction />,
         },
         {
            path: '/edit-tourist-attraction/:id',
            element: <UpdateTouristAttraction />,
         },
         {
            path: 'tourist-attractions',
            element: <SearchTouristAttractions />,
         },
         {
            path: 'tourist-attractions/:id',
            element: <TouristAttractionDetail />,
         },
         {
            path: 'approvals',
            element: <ApprovalTouristAttraction />,
            children: [
               {
                  index: true,
                  element: <Approval />,
               }, 
               {
                  path: 'history',
                  element: <ApprovalHistory />,
               }
            ],
         },
         {
            path: 'approvals/:id',
            element: <ApprovalDetail />,
         },
         {
            path: 'favorites',
            element: <Favorites />,
         }
      ],
   },
   {
      path: '*',
      element: <NotFound />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
