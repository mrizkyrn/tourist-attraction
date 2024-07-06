import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../api/tourist-attraction';
import { create, getByAttractionId, getByUsernameAndAttractionId, update, remove } from '../api/review';
import { createFavorite, checkFavorite, removeFavorite } from '../api/favorite';
import Container from '../component/layouts/Container';
import StarRating from '../component/StarRating';
import { FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import ReviewCard from '../component/tourist-attractions/ReviewCard';
import Cookies from 'js-cookie';

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

interface Review {
   id: number;
   attraction_id: number;
   username: string;
   rating: number;
   comment: string;
   created_at: string;
   updated_at: string;
}

const roundToHalf = (num: number): number => {
   return Math.round(num * 2) / 2;
};

const TouristAttractionDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const [attraction, setAttraction] = useState<TouristAttractionDetail | null>(null);
   const [reviews, setReviews] = useState<Review[]>([]);
   const [currentUserReview, setCurrentUserReview] = useState<Review | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [rating, setRating] = useState(1);
   const [comment, setComment] = useState('');
   const [isEditing, setIsEditing] = useState(false);
   const [isFavorite, setIsFavorite] = useState(false);
   const navigate = useNavigate();
   const username = Cookies.get('user') ? JSON.parse(Cookies.get('user')!).username : '';

   useEffect(() => {
      const fetchAttraction = async () => {
         setLoading(true);
         setError('');
         try {
            const data = await getDetails(parseInt(id!));
            if (data.success) {
               setAttraction(data.data);
            } else {
               setError("Invalid attraction ID or attraction doesn't exist.");
            }
         } catch (err) {
            setError('Failed to fetch attraction details.');
         } finally {
            setLoading(false);
         }
      };

      const fetchReviews = async () => {
         try {
            const data = await getByAttractionId(parseInt(id!));
            if (data.success) {
               setReviews(data.data);
            } else {
               setError(data.message);
            }
         } catch (err) {
            setError('Failed to fetch reviews.');
         }
      };

      const fetchCurrentUserReview = async () => {
         try {
            const data = await getByUsernameAndAttractionId(username, parseInt(id!));
            if (data.success) {
               setCurrentUserReview(data.data);
            }
         } catch (err) {
            console.error('Failed to fetch current user review.');
         }
      };

      const checkIsFavorite = async () => {
         try {
            const data = await checkFavorite(parseInt(id!));
            if (data.success) {
               setIsFavorite(data.data);
            }
         } catch (err) {
            console.error('Failed to check favorite.');
         }
      };

      fetchAttraction();
      fetchReviews();
      fetchCurrentUserReview();
      checkIsFavorite();
   }, [id, username]);

   const handleBack = () => {
      navigate('/tourist-attractions');
   };

   const handleReviewSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         if (isEditing && currentUserReview) {
            const response = await update(currentUserReview.id, { rating, comment });
            if (response.success) {
               toast.success('Review updated successfully!', {
                  theme: 'colored',
                  position: 'top-right',
               });
               setCurrentUserReview(response.data);
               setReviews((prevReviews) =>
                  prevReviews.map((review) => (review.id === currentUserReview.id ? response.data : review))
               );
               setIsEditing(false);
            } else {
               toast.error(response.message, {
                  theme: 'colored',
                  position: 'top-right',
               });
            }
         } else {
            const response = await create({
               attraction_id: attraction!.id,
               rating,
               comment,
            });

            if (response.success) {
               toast.success('Review submitted successfully!', {
                  theme: 'colored',
                  position: 'top-right',
               });
               setCurrentUserReview({ ...response.data, username });
               setReviews((prevReviews) => [{ ...response.data, username }, ...prevReviews]);
               setRating(1);
               setComment('');
            } else {
               toast.error(response.message, {
                  theme: 'colored',
                  position: 'top-right',
               });
            }
         }

         // Fetch updated attraction details
         const updatedAttraction = await getDetails(attraction!.id);
         if (updatedAttraction.success) {
            setAttraction(updatedAttraction.data);
         }
      } catch (err) {
         toast.error('Failed to submit review.', {
            theme: 'colored',
            position: 'top-right',
         });
      }
   };

   const handleReviewEdit = () => {
      setIsEditing(true);
      setRating(currentUserReview!.rating);
      setComment(currentUserReview!.comment);
   };

   const handleReviewDelete = async () => {
      const confirm = window.confirm('Are you sure you want to delete this review?');
      if (!confirm) {
         return;
      }
      try {
         const response = await remove(currentUserReview!.id);
         if (response.success) {
            toast.success('Review deleted successfully!', {
               theme: 'colored',
               position: 'top-right',
            });
            setCurrentUserReview(null);
            setReviews((prevReviews) => prevReviews.filter((review) => review.id !== currentUserReview!.id));
         } else {
            toast.error(response.message, {
               theme: 'colored',
               position: 'top-right',
            });
         }

         // Fetch updated attraction details
         const updatedAttraction = await getDetails(attraction!.id);
         if (updatedAttraction.success) {
            setAttraction(updatedAttraction.data);
         }
      } catch (err) {
         toast.error('Failed to delete review.', {
            theme: 'colored',
            position: 'top-right',
         });
      }
   };

   const handleFavorite = () => {
      if (isFavorite) {
         removeFavorite(attraction!.id)
            .then((data) => {
               if (data.success) {
                  setIsFavorite(false);
                  toast.success('Removed from favorite!', {
                     theme: 'colored',
                     position: 'top-right',
                  });
               } else {
                  toast.error(data.message, {
                     theme: 'colored',
                     position: 'top-right',
                  });
               }
            })
            .catch((err) => {
               console.error(err);
               toast.error('Failed to remove from favorite.', {
                  theme: 'colored',
                  position: 'top-right',
               });
            });
      } else {
         createFavorite(attraction!.id)
            .then((data) => {
               if (data.success) {
                  setIsFavorite(true);
                  toast.success('Added to favorite!', {
                     theme: 'colored',
                     position: 'top-right',
                  });
               } else {
                  toast.error(data.message, {
                     theme: 'colored',
                     position: 'top-right',
                  });
               }
            })
            .catch((err) => {
               console.error(err);
               toast.error('Failed to add to favorite.', {
                  theme: 'colored',
                  position: 'top-right',
               });
            });
      }
   };

   return (
      <Container>
         {loading ? (
            <p className="text-white">Loading...</p>
         ) : error || !attraction ? (
            <p className="text-red-500">{error || 'Attraction details not found.'}</p>
         ) : (
            <div>
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                     <button onClick={handleBack} className="text-gray-300 hover:text-white focus:outline-none">
                        <FaArrowLeft className="w-7 h-7 mr-1" />
                     </button>
                     <h1 className="text-white text-3xl font-semibold ml-3">{attraction.name}</h1>
                  </div>
                  {/* add favorite */}
                  <button
                     className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                     onClick={handleFavorite}
                  >
                     {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
                  </button>
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
                  <div className="flex items-center mb-4">
                     <span className="text-gray-400 mr-2">Rating:</span>
                     <StarRating rating={roundToHalf(attraction.rating)} />
                     <span className="text-gray-400 ml-2">({attraction.rating.toFixed(1)})</span>
                  </div>
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Address:</span> {attraction.address},{' '}
                     {attraction.city}, {attraction.province}, {attraction.country}, {attraction.postal_code}
                  </p>
                  {attraction.latitude && attraction.longitude && (
                     <p className="text-gray-400">
                        <span className="font-semibold text-gray-300">Location:</span>{' '}
                        <a
                           href={`https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`}
                           target="_blank"
                           rel="noreferrer"
                           className="text-blue-500 hover:underline"
                        >
                           View on Map
                        </a>
                     </p>
                  )}
                  <p className="text-gray-400">
                     <span className="font-semibold text-gray-300">Last Updated:</span> {attraction.updated_at}
                  </p>
               </div>

               <form onSubmit={handleReviewSubmit} className="mb-6">
                  <h2 className="text-gray-300 text-lg font-semibold mb-2">Leave a Review</h2>
                  <div className="mb-4">
                     <label className="block text-gray-400 mb-1" htmlFor="rating">
                        Rating:
                     </label>
                     <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
                     >
                        {[1, 2, 3, 4, 5].map((value) => (
                           <option key={value} value={value}>
                              {value}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-400 mb-1" htmlFor="comment">
                        Comment:
                     </label>
                     <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
                        rows={4}
                     ></textarea>
                  </div>
                  <button
                     type="submit"
                     className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                     {isEditing ? 'Update Review' : 'Submit Review'}
                  </button>
               </form>

               <div className="mb-6">
                  <h2 className="text-gray-300 text-lg font-semibold mb-4">Reviews</h2>
                  {currentUserReview && (
                     <ReviewCard
                        review={currentUserReview}
                        editable
                        onEdit={handleReviewEdit}
                        onDelete={handleReviewDelete}
                     />
                  )}
                  {reviews.length > 0 ? (
                     reviews.map((review) =>
                        review.username !== username ? <ReviewCard key={review.id} review={review} /> : null
                     )
                  ) : (
                     <p className="text-gray-400">No reviews yet.</p>
                  )}
               </div>
            </div>
         )}

         <ToastContainer />
      </Container>
   );
};

export default TouristAttractionDetail;
