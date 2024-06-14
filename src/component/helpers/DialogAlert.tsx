import React from 'react';

interface DialogAlertProps {
   message: string;
   actionText: string;
   onCancel: () => void;
   onAction: () => void;
}

const DialogAlert: React.FC<DialogAlertProps> = ({ message, actionText, onCancel, onAction }) => {
   return (
      <div className="fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[60]">
         <div className="bg-semiDark border border-dark shadow-md rounded-md px-4 py-5">
            <p className="text-light">{message}</p>

            <div className="flex justify-end gap-3 mt-5">
               <button
                  className="mt-7 bg-primary text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
                  onClick={onCancel}
               >
                  Cancel
               </button>
               <button
                  className="mt-7 bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700"
                  onClick={onAction}
               >
                  {actionText}
               </button>
            </div>
         </div>
      </div>
   );
};

export default DialogAlert;
