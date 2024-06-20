import { useEffect, useState } from 'react';
import { getByUsername, remove } from '../api/tourist-attraction';
import Container from '../component/layouts/Container';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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

const Home = () => {
   const [attraction, setAttraction] = useState<TouristAttractionDetail | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const user = Cookies.get('user');

   useEffect(() => {
      const fetchAttraction = async () => {
         setLoading(true);
         setError('');
         try {
            const data = await getByUsername(JSON.parse(user!).username);
            if (data.success) {
               setAttraction(data.data);
            }
         } catch (err) {
            setError('Failed to fetch attraction details.');
         } finally {
            setLoading(false);
         }
      };

      fetchAttraction();
   }, [user]);

   const hadleDelete = () => {
      if (attraction) {
         if (window.confirm('Are you sure you want to delete this tourist attraction?')) {
            remove(attraction.id)
               .then((data) => {
                  if (data.success) {
                     window.location.href = '/';
                  } else {
                     alert(data.message);
                  }
               })
               .catch((err) => {
                  console.error(err);
                  alert('Failed to delete tourist attraction.');
               });
         }
      }
   };

   return (
      <Container>
         {loading ? (
            <p className="text-white">Loading...</p>
         ) : error || !attraction ? (
            <div className="flex items-center justify-center flex-col gap-2 h-full mt-10">
               <p className="text-white">You have not created any tourist attraction yet.</p>
               <Link to="/create-tourist-attraction" className="text-blue-500 hover:underline">
                  Create Tourist Attraction
               </Link>
            </div>
         ) : (
            <div>
               <div className="flex items-center justify-between gap-2 mb-6">
                  <h1 className="text-white text-3xl font-semibold">My Tourist Attraction</h1>
                  <div>
                     <Link to={`/edit-tourist-attraction/${attraction.id}`} className="text-blue-500 hover:underline">
                        Edit
                     </Link>
                     <button className="text-red-500 hover:underline ml-5" onClick={hadleDelete}>
                        Delete
                     </button>
                  </div>
               </div>
               <h2 className="text-white text-2xl font-semibold mb-3">{attraction.name}</h2>
               <img
                  src={`${import.meta.env.VITE_BASE_URL}${attraction.thumbnail}`}
                  alt={attraction.name}
                  className="w-full h-96 object-cover rounded-md mb-4"
               />

               <div className="mb-6">
                  <h3 className="text-gray-300 text-lg font-semibold mb-1">Description</h3>
                  <p className="text-gray-400">{attraction.description}</p>
               </div>

               <div className="flex flex-col gap-2 mb-6">
                  <h3 className="text-gray-300 text-lg font-semibold mb-1">Details</h3>
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

export default Home;
