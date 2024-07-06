import React from 'react';
import { useNavigate } from 'react-router-dom';

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

interface Props {
   attraction: TouristAttraction;
   onApprove: (id: number) => void;
   onReject: (id: number) => void;
}

const ApprovalTouristAttractionCard: React.FC<Props> = ({ attraction, onApprove, onReject }) => {
   const navigate = useNavigate();

   return (
      <div className="bg-gray-800 p-4 rounded-md shadow-lg flex flex-col h-[550px] relative">
         <img
            src={`${import.meta.env.VITE_BASE_URL}${attraction.thumbnail}`}
            alt={attraction.name}
            className="w-full h-52 max-h-52 object-cover rounded-md mb-4"
         />
         <div className="flex-1">
            <h2 className="text-white text-xl font-semibold">{attraction.name}</h2>
            <div className="flex items-center mb-3">
               <span className="text-gray-400 mr-2">Entrance Fee:</span>
               <span className="text-yellow-400">Rp{attraction.entrance_fee}</span>
            </div>
            <p className="text-gray-400 mb-4 line-clamp-3">{attraction.description}</p>
            <div className="mb-4">
               <span className="bg-blue-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  {attraction.category}
               </span>
               {attraction.tags.map((tag, index) => (
                  <span
                     key={index}
                     className="bg-gray-700 text-gray-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                  >
                     {tag}
                  </span>
               ))}
            </div>
            <div className="flex items-center mb-4">
               <span className="text-gray-400 mr-2">Rating:</span>
               <span className="text-yellow-400">{Array(attraction.rating).fill('★').join('')}</span>
               <span className="text-gray-400 ml-2">({attraction.rating})</span>
            </div>
            <div className="text-gray-400">
               <p>
                  {attraction.city}, {attraction.province}
               </p>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
               <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  onClick={() => onApprove(attraction.id)}
               >
                  Approve
               </button>
               <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  onClick={() => onReject(attraction.id)}
               >
                  Reject
               </button>
            </div>
            <button
               className="absolute top-6 left-6 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
               onClick={() => navigate(`/approvals/${attraction.id}`)}
            >
               View Details
            </button>
         </div>
      </div>
   );
};

export default ApprovalTouristAttractionCard;
