import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { create } from '../api/tourist-attraction';
import Container from '../component/layouts/Container';

// example data to be sent to the server
// {
//    "thumbnail": File,
//    "name": "Example Attraction", //string
//    "description": "This is an example description of a tourist attraction.", //string
//    "category": "Example Category", //string
//    "tags": ["tag1", "tag2", "tag3"], //array of strings
//    "entrance_fee": 15.0, //number
//    "address": "123 Example Street", //string
//    "city": "Example City", //string
//    "province": "Example State", //string
//    "country": "Example Country", //string
//    "postal_code": "12345", //string
//    "latitude": 40.7128, // Optional
//    "longitude": -74.006 // Optional
// }

const CreateTouristAttraction: React.FC = () => {
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
      data.append('thumbnail', formData.thumbnail);
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

      console.log(data.get('thumbnail'));

      const response = await create(data);

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
         <h1 className="text-white text-2xl font-semibold mb-5">Create Tourist Attraction</h1>
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
                     required
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
                     onChange={handleChange}
                     className="w-full bg-gray-800 text-white p-2 rounded"
                  />
               </div>
            </div>
            <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded">
               Create Tourist Attraction
            </button>
         </form>

         <ToastContainer />
      </Container>
   );
};

export default CreateTouristAttraction;
