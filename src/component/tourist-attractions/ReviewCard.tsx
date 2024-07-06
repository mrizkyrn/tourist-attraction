import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ReviewCardProps {
  review: {
    id: number;
    attraction_id: number;
    username: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
  };
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, editable, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-300 font-semibold">{review.username}</h3>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">{Array(review.rating).fill('★').join('')}</span>
          <span className="text-gray-400">({review.rating})</span>
        </div>
      </div>
      <p className="text-gray-400 mb-2">{review.comment}</p>
      <p className="text-gray-500 text-sm">Reviewed on {new Date(review.created_at).toLocaleDateString()}</p>
      {editable && (
        <div className="flex mt-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 mr-4 flex items-center focus:outline-none"
          >
            <FaEdit className="mr-1" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 flex items-center focus:outline-none"
          >
            <FaTrash className="mr-1" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
