import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import Loadable from './Loadable';
import NotFound from '@/pages/errors/404';
import ViewTicket from '@/pages/ViewTicket';

const TripBooking = Loadable(React.lazy(() => import('../pages/TripBooking')));
const Login = Loadable(React.lazy(() => import('../pages/Login')));
const Register = Loadable(React.lazy(() => import('../pages/Register')));
const BookingComplete = Loadable(React.lazy(() => import('../pages/BookingComplete')));
// const UserAdd = Loadable(React.lazy(() => import('../layout/pages/users/userAdd')));
// const UserEdit = Loadable(React.lazy(() => import('../layout/pages/users/userEdit')));

const MainRouter = createBrowserRouter(
    
  createRoutesFromElements(
    <React.Fragment>
        
        <Route path='/' element={<MainLayout />}>
            {/* <Route path='booking'> */}
            <Route index element={<TripBooking />} errorElement={<Loadable />} />  
            {/* </Route> */}
        </Route>
        <Route path="complete" element={<BookingComplete />} errorElement={<Loadable />}/>
        <Route path='login' element={<Login />} errorElement={<Loadable />} />
        <Route path='register' element={<Register />} errorElement={<Loadable />} /> 
        <Route path='*' element={<NotFound />} errorElement={<Loadable />} /> 
    </React.Fragment>
  )
);

export default MainRouter;
