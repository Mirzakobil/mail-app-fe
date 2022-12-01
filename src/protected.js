import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  let name = localStorage.getItem('name');
  return name ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
