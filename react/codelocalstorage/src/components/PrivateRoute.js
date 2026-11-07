import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth !== "true") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;