import React from 'react'
import { RouterProvider } from 'react-router-dom'
import MainRouter from './routes/MainRouter'
import AuthProvider from './context/AuthProvider'
export default function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <RouterProvider router={MainRouter}/>
      </AuthProvider>
    </React.Fragment>
  )
}
