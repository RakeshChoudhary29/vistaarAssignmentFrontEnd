// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // You can add your token expiration logic here
  const isTokenValid = () => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // JWT decode
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  };

  if (!token || !isTokenValid()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
