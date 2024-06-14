import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useUser } from '../../context/UserContext';

const Layout: React.FC = () => {
   const { user, setUser } = useUser();
   const navigate = useNavigate();
   console.log('User:', user);

   // Mocking the user data   
   useEffect(() => {
      // Simulating a user object from some authentication mechanism
      const currentUser: any = {
         full_name: 'Example User',
         email: 'user@example.com',
         username: 'exampleuser',
         role: 'USER',
      };
      setUser(currentUser);
   }, [setUser]);

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

export default Layout;
