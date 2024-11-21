import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loadable from './Loadable';
import ProtectedRoute from './ProtectedRoute';

const TripBooking = Loadable(React.lazy(() => import('../pages/TripBooking')));
const Login = Loadable(React.lazy(() => import('../pages/Login')));
const Register = Loadable(React.lazy(() => import('../pages/Register')));
const ViewTicket = Loadable(React.lazy(() => import('../pages/ViewTicket')));
const BookingComplete = Loadable(React.lazy(() => import('../pages/BookingComplete')));
// const UserAdd = Loadable(React.lazy(() => import('../layout/pages/users/userAdd')));
// const UserEdit = Loadable(React.lazy(() => import('../layout/pages/users/userEdit')));

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/' element={<MainLayout />}>
        <Route path='booking'>
          <Route index element={<TripBooking />} errorElement={<Loadable />} />  
          <Route path="complete" element={<BookingComplete />} errorElement={<Loadable />}/>
        </Route>
        {/* <Route path='ticket' element={<ViewTicket />} errorElement={<Loadable />} /> */}
      </Route>
      <Route path='login' element={<Login />} errorElement={<Loadable />} />
      <Route path='register' element={<Register />} errorElement={<Loadable />} />
    </React.Fragment>
  )
);

export default MainRouter;
