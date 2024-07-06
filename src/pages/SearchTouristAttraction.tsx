import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { search } from '../api/tourist-attraction';
import { ToastContainer, toast } from 'react-toastify';
import Container from '../component/layouts/Container';
import TouristAttractionCard from '../component/tourist-attractions/TouristAttractionCard';
import 'react-toastify/dist/ReactToastify.css';

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
   city: string;
   province: string;
}

interface Pagination {
   total: number;
   current_page: number;
   total_pages: number;
   limit: number;
}

const SearchTouristAttractions = () => {
   const [searchParams, setSearchParams] = useState({
      name: '',
      category: '',
      city: '',
      province: '',
      tags: '',
      sort: '',
      order: 'asc',
      page: 1,
      limit: 5,
   });
   const [attractions, setAttractions] = useState<TouristAttraction[]>([]);
   const [pagination, setPagination] = useState<Pagination>({
      total: 0,
      current_page: 1,
      total_pages: 1,
      limit: 10,
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const fetchAttractions = async () => {
      setLoading(true);
      setError('');
      console.log('Search params:', searchParams);
      try {
         const data = await search(searchParams);
         if (data.success) {
            setAttractions(data.data);
            setPagination(data.pagination);
         } else {
            setError(data.message);

            toast.error(data.message, {
               theme: 'colored',
               position: 'top-right',
            });
         }
      } catch (err) {
         setError('Failed to fetch tourist attractions.');

         toast.error('Failed to fetch tourist attractions.', {
            theme: 'colored',
            position: 'top-right',
         });
      } finally {
         setLoading(false);
      }
   };

   console.log('Attractions:', attractions);

   useEffect(() => {
      fetchAttractions();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchParams.page, searchParams.limit, searchParams.sort, searchParams.order]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setSearchParams((prev) => ({ ...prev, [name]: value }));
   };

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      fetchAttractions();
   };

   const handlePageChange = (newPage: number) => {
      setSearchParams((prev) => ({ ...prev, page: newPage }));
   };

   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">Search Tourist Attractions</h1>
         <form onSubmit={handleSearch} className="mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
               <input
                  type="text"
                  name="name"
                  value={searchParams.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="px-4 py-2 border border-gray-300 rounded-md"
               />
               <input
                  type="text"
                  name="category"
                  value={searchParams.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="px-4 py-2 border border-gray-300 rounded-md"
               />
               <input
                  type="text"
                  name="city"
                  value={searchParams.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="px-4 py-2 border border-gray-300 rounded-md"
               />
               <input
                  type="text"
                  name="province"
                  value={searchParams.province}
                  onChange={handleInputChange}
                  placeholder="Province"
                  className="px-4 py-2 border border-gray-300 rounded-md"
               />
               <input
                  type="text"
                  name="tags"
                  value={searchParams.tags}
                  onChange={handleInputChange}
                  placeholder="Tags"
                  className="px-4 py-2 border border-gray-300 rounded-md"
               />
               <select
                  name="sort"
                  value={searchParams.sort}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
               >
                  <option value="" disabled>Sort By</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="entrance_fee">Entrance Fee</option>
                  <option value="created_at">Created At</option>
               </select>
               <select
                  name="order"
                  value={searchParams.order}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
               >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
               </select>
               <select
                  name="limit"
                  value={searchParams.limit}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
               >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
               </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
               Search
            </button>
         </form>

         {loading ? (
            <p className="text-white">Loading...</p>
         ) : error ? (
            <p className="text-red-500">{error}</p>
         ) : (
            <div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attractions.map((attraction) => (
                     <Link to={`/tourist-attractions/${attraction.id}`} key={attraction.id}>
                        <TouristAttractionCard attraction={attraction} />
                     </Link>
                  ))}
               </div>

               <div className="mt-4 flex justify-center space-x-2">
                  {Array.from({ length: pagination.total_pages }, (_, index) => (
                     <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-md ${
                           pagination.current_page === index + 1
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-800 text-gray-400'
                        }`}
                     >
                        {index + 1}
                     </button>
                  ))}
               </div>
            </div>
         )}

         <ToastContainer />
      </Container>
   );
};

export default SearchTouristAttractions;
