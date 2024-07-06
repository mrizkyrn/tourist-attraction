import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../api/tourist-attraction';
import { ToastContainer, toast } from 'react-toastify';
import Container from '../component/layouts/Container';
import { FaArrowLeft } from 'react-icons/fa';

interface ApprovalDetailProps {
   approval: {
      id: number;
      username: string;
      thumbnail: string;
      name: string;
      description: string;
      category: string;
      tags: string[];
      rating: number;
      entrance_fee: number;
      address: string;
      city: string;
      province: string;
      country: string;
      postal_code: string;
      latitude: number;
      longitude: number;
      created_at: string;
      updated_at: string;
   };
}

const ApprovalDetail: React.FC = () => {
   const [approval, setApproval] = useState<ApprovalDetailProps['approval'] | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchAttraction = async () => {
         setLoading(true);
         setError('');
         try {
            const data = await getDetails(parseInt(id!));
            if (data.success) {
               setApproval(data.data);
            } else {
               setError("Invalid attraction ID or attraction doesn't exist.");
               toast.error("Invalid attraction ID or attraction doesn't exist.");
            }
         } catch (err) {
            setError('Failed to fetch attraction details.');
            toast.error('Failed to fetch attraction details.');
         } finally {
            setLoading(false);
         }
      };

      fetchAttraction();
   }, [id]);

   const handleBack = () => {
      navigate('/approvals');
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error}</div>;
   }

   return (
      <Container>
         <div className="flex items-center mb-8">
            <button onClick={handleBack} className="text-gray-300 hover:text-white focus:outline-none">
               <FaArrowLeft className="w-7 h-7 mr-1" />
            </button>
            <h1 className="text-white text-3xl font-semibold ml-3">Attraction Details</h1>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full table-auto">
               <tbody>
                  {approval && (
                     <>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">ID</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.id}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Username</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.username}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Thumbnail</td>
                           <td className="border border-slate-700 px-4 py-2">
                              <img
                                 src={`${import.meta.env.VITE_BASE_URL}${approval.thumbnail}`}
                                 alt="Thumbnail"
                                 className="w-full h-auto object-cover rounded-md mb-4"
                              />
                           </td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Name</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.name}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Description</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.description}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Category</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.category}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Tags</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">
                              {approval.tags.join(', ')}
                           </td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Rating</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.rating}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Entrance Fee</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.entrance_fee}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Address</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.address}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">City</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.city}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Province</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.province}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Country</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.country}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Postal Code</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.postal_code}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Latitude</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.latitude}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Longitude</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.longitude}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Created At</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.created_at}</td>
                        </tr>
                        <tr>
                           <td className="border border-slate-700 px-4 py-2 font-semibold text-white">Updated At</td>
                           <td className="border border-slate-700 px-4 py-2 text-slate-100">{approval.updated_at}</td>
                        </tr>
                     </>
                  )}
               </tbody>
            </table>
         </div>
         <ToastContainer />
      </Container>
   );
};

export default ApprovalDetail;
