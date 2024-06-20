import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateCurrentUser } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Container from '../component/layouts/Container';

const UpdateUser: React.FC = () => {
   const [initialData, setInitialData] = useState({
      full_name: '',
      email: '',
      username: '',
   });
   const [formData, setFormData] = useState({
      full_name: '',
      email: '',
      username: '',
   });
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUser = async () => {
         const response = await getCurrentUser();
         if (response.success) {
            setInitialData({
               full_name: response.data.full_name,
               email: response.data.email,
               username: response.data.username,
            });
            setFormData({
               full_name: response.data.full_name,
               email: response.data.email,
               username: response.data.username,
            });
         } else {
            toast.error(response.message, {
               theme: 'colored',
               position: 'top-left',
            });
         }
         setLoading(false);
      };

      fetchUser();
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const updatedData: any = {};

      // Compare formData with initialData and add changed fields to updatedData
      for (const key in formData) {
         if (formData[key as keyof typeof formData] !== initialData[key as keyof typeof initialData]) {
            updatedData[key] = formData[key as keyof typeof formData];
         }
      }

      const response = await updateCurrentUser(updatedData);
      if (response.success) {
         Cookies.set('user', JSON.stringify(response.data));
         toast.success(response.message, {
            theme: 'colored',
            position: 'top-right',
         });
         navigate('/');
      } else {
         toast.error(response.message, {
            theme: 'colored',
            position: 'top-left',
         });
      }
   };

   if (loading) {
      return <div className="text-white">Loading...</div>;
   }

   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">Edit Profile</h1>
         <form onSubmit={handleSubmit}>
            <div className="mb-5">
               <label className="block text-gray-200 mb-2">Full Name</label>
               <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-slate-200 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
               />
            </div>
            <div className="mb-5">
               <label className="block text-gray-200 mb-2">Email</label>
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-slate-200 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
               />
            </div>
            <div className="mb-5">
               <label className="block text-gray-200 mb-2">Username</label>
               <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-slate-200 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
               />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-[rgb(70,111,158)] text-white py-2 rounded-lg mt-8">
               Update
            </button>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default UpdateUser;
