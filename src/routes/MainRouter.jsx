import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layouts/MainLayout';
import Loadable from './Loadable';

const TripBooking = Loadable(React.lazy(() => import('../pages/TripBooking')));
const Login = Loadable(React.lazy(() => import('../pages/Login')));
// const UserAdd = Loadable(React.lazy(() => import('../layout/pages/users/userAdd')));
// const UserEdit = Loadable(React.lazy(() => import('../layout/pages/users/userEdit')));

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='booking' element={<TripBooking />} errorElement={<Loadable />} />
      <Route path='login' element={<Login />} errorElement={<Loadable />} />
      {/* <Route path='user' element={<UserList />} />
      <Route path='user/add' element={<UserAdd />} />
      <Route path='user/:id' element={<UserEdit />} /> */}
    </Route>
  )
);

export default MainRouter;
