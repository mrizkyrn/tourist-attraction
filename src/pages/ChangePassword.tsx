import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import Container from '../component/layouts/Container';

const ChangePassword: React.FC = () => {
   const [formData, setFormData] = useState({
      old_password: '',
      new_password: '',
      confirm_password: '',
   });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (formData.new_password !== formData.confirm_password) {
         toast.error('New passwords do not match', {
            theme: 'colored',
            position: 'top-left',
         });
         return;
      }

      setLoading(true);

      const response = await updatePassword({
         old_password: formData.old_password,
         new_password: formData.new_password,
      });

      setLoading(false);

      if (response.success) {
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

   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">Change Password</h1>
         <form onSubmit={handleSubmit}>
            <div className="mb-5">
               <label className="block text-gray-200 mb-2">Old Password</label>
               <input
                  type="password"
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-slate-200 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  required
               />
            </div>
            <div className="mb-5">
               <label className="block text-gray-200 mb-2">New Password</label>
               <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-slate-200 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  required
               />
            </div>
            <div className="mb-5">
               <label className="block text-gray-200 mb-2">Confirm New Password</label>
               <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-slate-200 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  required
               />
            </div>
            <button
               type="submit"
               className={`w-full bg-primary hover:bg-[rgb(70,111,158)] text-white py-2 rounded-lg mt-8 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
               }`}
               disabled={loading}
            >
               {loading ? 'Updating...' : 'Change Password'}
            </button>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default ChangePassword;
