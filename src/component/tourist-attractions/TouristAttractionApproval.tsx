import React, { useEffect, useState } from 'react';
import { approveAttraction, rejectAttraction, getAttractionsByStatus } from '../../api/tourist-attraction';
import { ToastContainer, toast } from 'react-toastify';
import ApprovalTouristAttractionCard from './ApprovalTouristAttractionCard';
import 'react-toastify/dist/ReactToastify.css';

interface TouristAttraction {
   id: number;
   thumbnail: string;
   name: string;
   description: string;
   category: string;
   tags: string[];
   entrance_fee: number;
   city: string;
   province: string;
   rating: number;
}

const Approval: React.FC = () => {
   const [attractions, setAttractions] = useState<TouristAttraction[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const fetchPendingAttractions = async () => {
      setLoading(true);
      setError('');
      try {
         const data = await getAttractionsByStatus('PENDING');
         if (data.success) {
            setAttractions(data.data);
         } else {
            setError(data.message);
         }
      } catch (err) {
         setError('Failed to fetch pending attractions.');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchPendingAttractions();
   }, []);

   const handleApprove = async (id: number) => {
      try {
         const data = await approveAttraction(id);
         if (data.success) {
            setAttractions(attractions.filter((attraction) => attraction.id !== id));
            toast.success('Attraction approved successfully!', {
               theme: 'colored',
               position: 'top-right',
            });
         } else {
            toast.error(data.message, {
               theme: 'colored',
               position: 'top-right',
            });
         }
      } catch (err) {
         toast.error('Failed to approve attraction.', {
            theme: 'colored',
            position: 'top-right',
         });
      }
   };

   const handleReject = async (id: number) => {
      try {
         const data = await rejectAttraction(id);
         if (data.success) {
            setAttractions(attractions.filter((attraction) => attraction.id !== id));
            toast.success('Attraction rejected successfully!', {
               theme: 'colored',
               position: 'top-right',
            });
         } else {
            toast.error(data.message, {
               theme: 'colored',
               position: 'top-right',
            });
         }
      } catch (err) {
         toast.error('Failed to reject attraction.', {
            theme: 'colored',
            position: 'top-right',
         });
      }
   };

   return (
      <div>
         <h1 className="text-white text-2xl font-semibold mb-5">Tourist Attractions</h1>
         {loading ? (
            <p className="text-white">Loading...</p>
         ) : error ? (
            <p className="text-red-500">{error}</p>
         ) : (
            <div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attractions.map((attraction) => (
                     <ApprovalTouristAttractionCard
                        key={attraction.id}
                        attraction={attraction}
                        onApprove={handleApprove}
                        onReject={handleReject}
                     />
                  ))}
               </div>
            </div>
         )}
         <ToastContainer />
      </div>
   );
};

export default Approval;
