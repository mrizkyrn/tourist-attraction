import { useEffect, useState } from 'react';
import { getAll, deleteByUsername } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import Container from '../component/layouts/Container';

const UserList = () => {
   const [users, setUsers] = useState<any[]>([]);

   useEffect(() => {
      const fetchUsers = async () => {
         const data = await getAll();

         if (!data.success) {
            console.error('Failed to fetch users:', data.message);
            return;
         }

         setUsers(data.data);
      };

      fetchUsers();
   }, []);

   const handleDelete = (username: string) => {
      const confirm = window.confirm('Are you sure you want to delete this user?');

      if (!confirm) {
         return;
      }

      const deleteUser = async () => {
         const data = await deleteByUsername(username);

         if (!data.success) {
            console.error('Failed to delete user:', data.message);

            toast.error(data.message, {
               theme: 'colored',
               position: 'top-left',
            });
            return;
         }

         const updatedUsers = users.filter((user) => user.username !== username);
         setUsers(updatedUsers);

         toast.success(data.message, {
            theme: 'colored',
            position: 'top-right',
         });
      };

      deleteUser();
   };

   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">All Users</h1>
         <div className="overflow-x-auto">
            <table className="w-full table-auto">
               <thead className="bg-gray-800">
                  <tr>
                     <th className="px-4 py-2 border border-slate-700 text-white">Full Name</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Email</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Username</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Role</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user.username}>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{user.full_name}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{user.email}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{user.username}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{user.role}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">
                           <button
                              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                              onClick={() => handleDelete(user.username)}
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <ToastContainer />
      </Container>
   );
};

export default UserList;
