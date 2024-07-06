import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const getStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-yellow-400" />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {Array(emptyStars).fill(<FaRegStar className="text-gray-400" />)}
      </>
    );
  };

  return <div className="flex items-center">{getStars()}</div>;
};

export default StarRating;
