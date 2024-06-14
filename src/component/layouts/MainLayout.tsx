import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

const MainLayout: React.FC = () => {
   const navigate = useNavigate();
   const user = Cookies.get('user');

   // if user is not logged in, redirect to signin page
   useEffect(() => {
      if (!user) {
         navigate('/signin');
      }
   }, [user, navigate]);

   return (
      <>
         <Navbar />
         <div className="font-poppins w-full pb-28 sm:pb-10 pt-10 sm:pl-20 lg:pl-64 min-h-screen bg-semiDark">
            <Outlet />
         </div>
      </>
   );
};

export default MainLayout;
