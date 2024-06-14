import React from 'react';

interface UserProfileProps {
   isOpen: boolean;
   onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
   return (
      <div
         className={`fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[60] ${
            isOpen ? 'block' : 'hidden'
         }`}
      >
         <div className="bg-semiDark border border-dark shadow-md rounded-md px-4 py-5">
            <p className="text-light">User Profile</p>

            <div className="flex justify-end gap-3 mt-5">
               <button
                  className="mt-7 bg-primary text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
                  onClick={onClose}
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
