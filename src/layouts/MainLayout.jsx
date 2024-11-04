import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider';

export default function MainLayout() {
  const user = useAuth();
  console.log(Boolean(user.token));
  
  if (!user.token) {
    return <Navigate to="/login" />;
  }
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  )
}
