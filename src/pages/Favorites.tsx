import { useState, useEffect } from 'react';
import { getByusername } from '../api/favorite';
import Container from '../component/layouts/Container';
import { ToastContainer } from 'react-toastify';
import TouristAttractionCard from '../component/tourist-attractions/TouristAttractionCard';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

interface TouristAttraction {
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

const Favorites = () => {
   const [favorites, setFavorites] = useState<TouristAttraction[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const username = Cookies.get('user') ? JSON.parse(Cookies.get('user')!).username : '';

   useEffect(() => {
      const fetchFavorites = async () => {
         setLoading(true);
         try {
            const data = await getByusername(username);
            if (data.success) {
               setFavorites(data.data);
            } else {
               setError('Failed to fetch favorites');
            }
         } catch (error) {
            setError('Failed to fetch favorites');
         } finally {
            setLoading(false);
         }
      };
   
      fetchFavorites();
   }, [username]);

   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">My Favorites</h1>
         {loading ? (
            <p className="text-white">Loading...</p>
         ) : error ? (
            <p className="text-red-500">{error}</p>
         ) : favorites.length === 0 ? (
            <p className="text-white">No favorite attractions found.</p>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {favorites.map((favorite) => (
                  <Link to={`/tourist-attractions/${favorite.id}`} key={favorite.id}>
                     <TouristAttractionCard attraction={favorite} />
                  </Link>
               ))}
            </div>
         )}
         <ToastContainer />
      </Container>
   );
};

export default Favorites;
