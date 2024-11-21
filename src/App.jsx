import React from 'react'
import { RouterProvider } from 'react-router-dom'
import MainRouter from './routes/MainRouter'
import AuthProvider from './context/AuthProvider'
import MultiStepperProvider from './context/MultiStepperProvider'
export default function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <MultiStepperProvider>
            <RouterProvider router={MainRouter}/>
        </MultiStepperProvider>
      </AuthProvider>
    </React.Fragment>
  )
}
