// src/components/TouristAttractionCard.tsx

import React from 'react';

interface TouristAttraction {
   id: number;
   thumbnail: string;
   name: string;
   description: string;
   category: string;
   tags: string[];
   city: string;
   province: string;
   rating: number;
}

interface Props {
   attraction: TouristAttraction;
}

const TouristAttractionCard: React.FC<Props> = ({ attraction }) => {
   return (
      <div className="bg-gray-800 p-4 rounded-md shadow-lg flex flex-col h-[500px]">
         <img
            src={`${import.meta.env.VITE_BASE_URL}${attraction.thumbnail}`}
            alt={attraction.name}
            className="w-full h-52 max-h-52 object-cover rounded-md mb-4"
         />
         <div className="flex-1">
            <h2 className="text-white text-xl font-semibold mb-2">{attraction.name}</h2>
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
         </div>
      </div>
   );
};

export default TouristAttractionCard;
