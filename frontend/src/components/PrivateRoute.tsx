// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { authService } from '../services/auth';

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC = ({ children }) => {
//   return authService.isAuthenticated() ? <>{children}</> : ;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  // If user is logged in, render the protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise, redirect to login page
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
