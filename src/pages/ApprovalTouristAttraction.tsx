import React from 'react';
import Container from '../component/layouts/Container';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet } from 'react-router-dom';

const ApprovalTouristAttractions: React.FC = () => {
   return (
      <Container>
         <h1 className="text-white text-2xl font-semibold mb-5">Tourist Attractions Approval</h1>
         <nav className="flex items-center justify-between mb-5">
            <Link to="." className="text-blue-500">
               View Pending
            </Link>
            <Link to="history" className="text-blue-500">
               View History
            </Link>
         </nav>

         <Outlet />
      </Container>
   );
};

export default ApprovalTouristAttractions;
