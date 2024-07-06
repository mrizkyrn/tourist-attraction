import React, { useEffect, useState } from 'react';
import { getAll } from '../../api/attraction-approval';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApprovalHistory: React.FC = () => {
   const [approvals, setApprovals] = useState<any[]>([]);

   useEffect(() => {
      const fetchApprovals = async () => {
         const data = await getAll();
         if (data.success) {
            setApprovals(data.data);
         } else {
            console.error('Failed to fetch attraction approvals:', data.message);
            toast.error(data.message, {
               theme: 'colored',
               position: 'top-right',
            });
         }
      };
      fetchApprovals();
   }, []);

   return (
      <div>
         <h1 className="text-white text-2xl font-semibold mb-5">Attraction Approvals</h1>
         <div className="overflow-x-auto">
            <table className="w-full table-auto">
               <thead className="bg-gray-800">
                  <tr>
                     <th className="px-4 py-2 border border-slate-700 text-white">Attraction ID</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Username</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Status</th>
                     <th className="px-4 py-2 border border-slate-700 text-white">Processed At</th>
                  </tr>
               </thead>
               <tbody>
                  {approvals.map((approval) => (
                     <tr key={approval.id}>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.attraction_id}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.username}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.status}</td>
                        <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.created_at}</td>
                        
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <ToastContainer />
      </div>
   );
};

export default ApprovalHistory;
