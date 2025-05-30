import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to='/dashboard' />;
  }
  return <Outlet />;
};

export default AdminRoute;
