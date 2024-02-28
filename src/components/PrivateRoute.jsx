import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ token, redirectTo = '/' }) => {

  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
