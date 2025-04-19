import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes('token=');
  console.log({isAuthenticated});

  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;