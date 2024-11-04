import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loadable from './Loadable';

const TripBooking = Loadable(React.lazy(() => import('../pages/TripBooking')));
const Login = Loadable(React.lazy(() => import('../pages/Login')));
// const UserAdd = Loadable(React.lazy(() => import('../layout/pages/users/userAdd')));
// const UserEdit = Loadable(React.lazy(() => import('../layout/pages/users/userEdit')));

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/' element={<MainLayout />}>
        <Route path='booking' element={<TripBooking />} errorElement={<Loadable />} />
        {/* <Route path='user' element={<UserList />} />
        <Route path='user/add' element={<UserAdd />} />
        <Route path='user/:id' element={<UserEdit />} /> */}
      </Route>
      <Route path='login' element={<Login />} errorElement={<Loadable />} />
    </React.Fragment>
  )
);

export default MainRouter;
