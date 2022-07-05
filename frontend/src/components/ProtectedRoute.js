import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn, redirectPath, ...props }) => {
  return loggedIn ? children :  <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
