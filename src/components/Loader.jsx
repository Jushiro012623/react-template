import React from 'react'

import { PropagateLoader } from "react-spinners";
import Typography from './ui/Typography';
export default function Loader() {
  return (
    <div className='w-full fixed top-0 z-10 left-0 bg-white h-screen flex felx-col gap-2 items-center justify-center'>
      <PropagateLoader
        color="#808CF8"
        size={20}
      />
    </div>
  )
}
