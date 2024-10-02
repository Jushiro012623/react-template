import React from 'react'
import { RouterProvider } from 'react-router-dom'
import MainRouter from './routes/MainRouter'
export default function App() {
  return (
    <React.Fragment>
      <RouterProvider router={MainRouter}/>
    </React.Fragment>
  )
}
