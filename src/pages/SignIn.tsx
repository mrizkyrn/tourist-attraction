import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

const SignIn: React.FC = () => {
   const [formData, setFormData] = useState({
      username: '',
      password: '',
   });
   const navigate = useNavigate();
   const user = Cookies.get('user');

   useEffect(() => {
      if (user) {
         navigate('/');
      }
   }, [user, navigate]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         const data = await login(formData);
         if (data.success) {
            Cookies.set('user', JSON.stringify(data.data));
            Cookies.set('access_token', data.data.token);
            navigate('/');
         } else {
            toast.error(data.message, {
               theme: 'colored',
               position: 'top-left',
            });
         }
      } catch (error: any) {
         toast.error(error.message || 'An error occurred. Please try again.', {
            theme: 'colored',
            position: 'top-left',
         });
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                     Username
                  </label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     value={formData.username}
                     onChange={handleChange}
                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                     required
                  />
               </div>
               <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     value={formData.password}
                     onChange={handleChange}
                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                     required
                  />
               </div>
               <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
               >
                  Sign In
               </button>

               <p className="text-center text-sm text-gray-700">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-blue-500 hover:underline">
                     Sign Up
                  </a>
               </p>
            </form>
         </div>

         <ToastContainer />
      </div>
   );
};

export default SignIn;
