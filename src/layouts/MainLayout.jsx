import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider';

export default function MainLayout() {
  const { token } = useAuth();
  React.useEffect(() => {
    console.log(token);
    
  },[token])
    return ( token ? <React.Fragment>
                        <Navbar />
                        <Outlet />
                    </React.Fragment> 
            : <Navigate to="/login" />)
}
