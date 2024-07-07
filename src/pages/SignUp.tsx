import React, { useEffect, useState } from 'react';
import { register } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

const SignUp: React.FC = () => {
   const [formData, setFormData] = useState({
      full_name: '',
      username: '',
      email: '',
      password: '',
      role: 'USER',
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
         const data = await register(formData);
         if (data.success) {
            toast.success(data.message, {
               theme: 'colored',
               position: 'top-right',
            });

            navigate('/signin');
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
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                     Full Name
                  </label>
                  <input
                     type="text"
                     name="full_name"
                     id="full_name"
                     value={formData.full_name}
                     onChange={handleChange}
                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                     required
                  />
               </div>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     value={formData.email}
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
                  Sign Up
               </button>

               <p className="text-center text-sm text-gray-700">
                  Already have an account?{' '}
                  <a href="/signin" className="text-blue-500 hover:underline">
                     Sign In
                  </a>
               </p>
            </form>
         </div>

         <ToastContainer />
      </div>
   );
};

export default SignUp;
