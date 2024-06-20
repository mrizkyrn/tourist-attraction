import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { update, getDetails } from '../api/tourist-attraction';
import Container from '../component/layouts/Container';

const UpdateTouristAttraction: React.FC = () => {
   const { id } = useParams<{ id: string | undefined }>();

   const [formData, setFormData] = useState({
      thumbnail: new File([], ''),
      name: '',
      description: '',
      category: '',
      tags: '',
      entrance_fee: '',
      address: '',
      city: '',
      province: '',
      country: '',
      postal_code: '',
      latitude: '',
      longitude: '',
   });

   useEffect(() => {
      const fetchTouristAttraction = async () => {
         const response = await getDetails(Number(id));
         if (response.success) {
            setFormData({
               ...response.data,
               thumbnail: new File([], ''), // Assuming thumbnail is a string URL, you'll need to handle it appropriately
            });
         } else {
            toast.error(response.message, {
               theme: 'colored',
               position: 'top-left',
            });
         }
      };
      fetchTouristAttraction();
   }, [id]);

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFormData({ ...formData, thumbnail: e.target.files[0] });
      }
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('tags', formData.tags);
      data.append('entrance_fee', formData.entrance_fee);
      data.append('address', formData.address);
      data.append('city', formData.city);
      data.append('province', formData.province);
      data.append('country', formData.country);
      data.append('postal_code', formData.postal_code);
      formData.latitude && data.append('latitude', formData.latitude);
      formData.longitude && data.append('longitude', formData.longitude);

      const response = await update(Number(id), data);

      if (response.success) {
         toast.success(response.message, {
            theme: 'colored',
            position: 'top-right',
         });
      } else {
         toast.error(response.message, {
            theme: 'colored',
            position: 'top-left',
         });
      }
   };

   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">Update Tourist Attraction</h1>
         <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-2 gap-5">
               <div>
                  <label htmlFor="thumbnail" className="block text-white mb-2">
                     Thumbnail
                  </label>
                  <input
                     type="file"
                     name="thumbnail"
                     id="thumbnail"
                     onChange={handleFileChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="name" className="block text-white mb-2">
                     Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     id="name"
                     value={formData.name}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
               <div>
                  <label htmlFor="description" className="block text-white mb-2">
                     Description
                  </label>
                  <textarea
                     name="description"
                     id="description"
                     value={formData.description}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  ></textarea>
               </div>
               <div>
                  <label htmlFor="category" className="block text-white mb-2">
                     Category
                  </label>
                  <input
                     type="text"
                     name="category"
                     id="category"
                     value={formData.category}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
               <div>
                  <label htmlFor="tags" className="block text-white mb-2">
                     Tags
                  </label>
                  <input
                     type="text"
                     name="tags"
                     id="tags"
                     value={formData.tags}
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="entrance_fee" className="block text-white mb-2">
                     Entrance Fee
                  </label>
                  <input
                     type="number"
                     name="entrance_fee"
                     id="entrance_fee"
                     value={formData.entrance_fee}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
               <div>
                  <label htmlFor="address" className="block text-white mb-2">
                     Address
                  </label>
                  <input
                     type="text"
                     name="address"
                     id="address"
                     value={formData.address}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="city" className="block text-white mb-2">
                     City
                  </label>
                  <input
                     type="text"
                     name="city"
                     id="city"
                     value={formData.city}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
               <div>
                  <label htmlFor="province" className="block text-white mb-2">
                     Province
                  </label>
                  <input
                     type="text"
                     name="province"
                     id="province"
                     value={formData.province}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="country" className="block text-white mb-2">
                     Country
                  </label>
                  <input
                     type="text"
                     name="country"
                     id="country"
                     value={formData.country}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
               <div>
                  <label htmlFor="postal_code" className="block text-white mb-2">
                     Postal Code
                  </label>
                  <input
                     type="text"
                     name="postal_code"
                     id="postal_code"
                     value={formData.postal_code}
                     required
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="latitude" className="block text-white mb-2">
                     Latitude
                  </label>
                  <input
                     type="text"
                     name="latitude"
                     id="latitude"
                     value={formData.latitude}
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
               <div>
                  <label htmlFor="longitude" className="block text-white mb-2">
                     Longitude
                  </label>
                  <input
                     type="text"
                     name="longitude"
                     id="longitude"
                     value={formData.longitude}
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded">
               Update Tourist Attraction
            </button>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default UpdateTouristAttraction;
