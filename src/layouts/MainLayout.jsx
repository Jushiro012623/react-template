import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider';
import Footer from '@/components/Footer';

export default function MainLayout() {
  const { token } = useAuth();
    return ( token ? <React.Fragment>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </React.Fragment> 
            : <Navigate to="/login" />)
}
