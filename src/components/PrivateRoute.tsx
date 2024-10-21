import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

export default PrivateRoute;
