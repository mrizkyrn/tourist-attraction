import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../api/user';
import { HomeIcon } from '../icons/Icons';
import { FaUsers } from "react-icons/fa";
import { FaArchway } from "react-icons/fa";
import DialogAlert from '../helpers/DialogAlert';
import Cookies from 'js-cookie';

interface NavbarItem {
   name: string;
   icon: JSX.Element;
   path: string;
   role?: string;
}

const NavbarItems = (userRole: string): NavbarItem[] => {
   const items: NavbarItem[] = [
      {
         name: 'Home',
         icon: <HomeIcon className="w-5 h-5" />,
         path: '/',
      },
      {
         name: 'User List ',
         icon: <FaUsers className="w-5 h-5" />,
         path: '/user-list',
         role: 'ADMIN',
      },
      {
         name: 'Tourist Attractions',
         icon: <FaArchway className="w-5 h-5" />,
         path: '/tourist-attractions',
      },
   ];

   // Filter navbar items based on user role
   return items.filter((item) => !item.role || item.role === userRole);
};

const Navbar: React.FC = () => {
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const navigate = useNavigate();
   const user = Cookies.get('user');
   const full_name = user ? JSON.parse(user).full_name : '';
   const username = user ? JSON.parse(user).username : '';
   const email = user ? JSON.parse(user).email : '';
   const role = user ? JSON.parse(user).role : '';

   const handleLogout = async () => {
      try {
         const res = await logout();
         console.log('Logout response:', res);

         if (res.success) {
            Cookies.remove('user');
            Cookies.remove('access_token');

            navigate('/signin');
         } else {
            // Handle signout failure
         }
      } catch (error: any) {
         console.error('Logout error:', error);
      }
   };

   return (
      <>
         {/* Desktop Navbar */}
         <div className="w-20 lg:w-64 fixed flex-shrink-0 hidden sm:flex flex-col h-screen py-10 px-4 bg-dark border-r border-gray-700 duration-200 ease-in-out">
            <div className="flex flex-col items-start -mx-2">
               <h4 className="hidden lg:block mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 text-2xl">
                  {full_name}
               </h4>
               <h4 className="hidden lg:block mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 text-sm">
                  {username}
               </h4>
               <h4 className="hidden lg:block mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 text-sm">
                  {email}
               </h4>
               {/* edit profile and change password */}
               <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                     className="flex items-center gap-2 px-2 py-1 text-sky-600 text-sm rounded-lg hover:text-sky-500"
                     onClick={() => navigate('/edit-profile')}
                  >
                     <span>Edit Profile</span>
                  </button>
                  <button
                     className="flex items-center gap-2 px-2 py-1 text-sky-600 text-sm rounded-lg hover:text-sky-500"
                     onClick={() => navigate('/change-password')}
                  >
                     <span>Change Password</span>
                  </button>
               </div>
            </div>

            {/* line */}
            <div className="w-full h-[1px] bg-gray-700 mt-5" />

            {/* nav links */}
            <div className="flex flex-col justify-between flex-1">
               <nav className="flex flex-col gap-4 mt-5">
                  {NavbarItems(role).map(({ name, icon, path }) => (
                     <NavLink
                        key={name}
                        to={path}
                        aria-label={name}
                        className={({ isActive }) =>
                           `flex items-center justify-start gap-3 h-12 px-[0.85rem] rounded-lg text-light hover:bg-gray-700 ${
                              isActive ? 'bg-gray-800' : ''
                           }`
                        }
                     >
                        <div>{icon}</div>
                        <span className="hidden lg:block">{name}</span>
                     </NavLink>
                  ))}
               </nav>
               <button
                  className="w-full flex justify-start items-center gap-3 h-12 px-3 rounded-lg text-light hover:bg-gray-600 text-start"
                  aria-label="logout"
                  onClick={() => setIsAlertOpen(true)}
               >
                  <div>
                     <HomeIcon className="w-5 h-5" />
                  </div>
                  <span className="hidden lg:block">Logout</span>
               </button>
            </div>
         </div>

         {/* Mobile Navbar */}
         <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-2 sm:hidden h-20 px-5 pb-3 bg-dark border-t border-gray-700 z-10">
            {NavbarItems(role).map(({ name, icon, path }) => (
               <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                     `w-full flex justify-center py-3 text-center rounded-lg text-light hover:bg-gray-700 ${
                        isActive ? 'bg-gray-800' : ''
                     }`
                  }
               >
                  <div>{icon}</div>
               </NavLink>
            ))}
         </div>

         {/* Show alert when logout */}
         {isAlertOpen && (
            <DialogAlert
               message="Are you sure you want to logout?"
               actionText="Logout"
               onCancel={() => setIsAlertOpen(false)}
               onAction={handleLogout}
            />
         )}
      </>
   );
};

export default Navbar;
