import React from 'react'
import { BeatLoader } from 'react-spinners'
import Typography from './Typography'
export default function MiniLoader({color, className}) {
  return (
    <div className={` flex items-center justify-center gap-y-2 flex-col ${className}`} >
        <BeatLoader  color={color}/>
        <Typography variant='info' >Loading, please wait...</Typography>
    </div>
  )
  
}
