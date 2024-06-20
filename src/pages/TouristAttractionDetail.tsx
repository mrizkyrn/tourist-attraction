import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../api/tourist-attraction';
import Container from '../component/layouts/Container';
import { FaArrowLeft } from 'react-icons/fa';

interface TouristAttractionDetail {
   id: number;
   user_id: number;
   thumbnail: string;
   name: string;
   description: string;
   category: string;
   tags: string[];
   entrance_fee: number;
   rating: number;
   status: string;
   address: string;
   city: string;
   province: string;
   country: string;
   postal_code: string;
   latitude: number;
   longitude: number;
   updated_at: string;
}

const TouristAttractionDetail = () => {
   const { id } = useParams<{ id: string }>();
   const [attraction, setAttraction] = useState<TouristAttractionDetail | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      const fetchAttraction = async () => {
         setLoading(true);
         setError('');
         try {
            const data = await getDetails(parseInt(id!));
            if (data.success) {
               setAttraction(data.data);
            } else {
               setError("Invalid attraction ID or attraction doesn't exist.")
            }
         } catch (err) {
            setError('Failed to fetch attraction details.');
         } finally {
            setLoading(false);
         }
      };

      fetchAttraction();
   }, [id]);

   const handleBack = () => {
      navigate('/tourist-attractions');
   };

   return (
      <Container>
         {loading ? (
            <p className="text-white">Loading...</p>
         ) : error || !attraction ? (
            <p className="text-red-500">{error || 'Attraction details not found.'}</p>
         ) : (
            <div>
               <div className="flex items-center mb-8">
                  <button onClick={handleBack} className="text-gray-300 hover:text-white focus:outline-none">
                     <FaArrowLeft className="w-7 h-7 mr-1" />
                  </button>
                  <h1 className="text-white text-3xl font-semibold ml-3">{attraction.name}</h1>
               </div>
               <img
                  src={`${import.meta.env.VITE_BASE_URL}${attraction.thumbnail}`}
                  alt={attraction.name}
                  className="w-full h-96 object-cover rounded-md mb-4"
               />

               <div className="mb-6">
                  <h2 className="text-gray-300 text-lg font-semibold mb-1">Description</h2>
                  <p className="text-gray-400">{attraction.description}</p>
               </div>

               <div className="flex flex-col gap-2 mb-6">
                  <h2 className="text-gray-300 text-lg font-semibold mb-1">Details</h2>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Category:</span> {attraction.category}
                  </p>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Entrance Fee:</span> Rp.{attraction.entrance_fee}
                  </p>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Rating:</span> {attraction.rating}
                  </p>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Address:</span> {attraction.address},{' '}
                     {attraction.city}, {attraction.province}, {attraction.country}, {attraction.postal_code}
                  </p>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Coordinates:</span> ({attraction.latitude},{' '}
                     {attraction.longitude})
                  </p>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Last Updated:</span> {attraction.updated_at}
                  </p>
               </div>
            </div>
         )}
      </Container>
   );
};

export default TouristAttractionDetail;
