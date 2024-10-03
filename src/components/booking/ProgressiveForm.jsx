import React from 'react'
import { IoBoat, IoCheckmarkSharp   } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Typography from '../core/Typography';
export default function ProgressiveForm() {
  return (
    <div className='mx-auto rounded-[40px] flex gap-x-10 shadow-md px-4 py-4 bg-white'>
        <div className='flex items-center w-44 gap-x-2'>
            <FaCheck className="rounded-full bg-rose-500 border w-11 text-white h-11 p-3 inline" size="20"/>
            <div className='inline-block'>
                <Typography className="block" variant="info">Steps 1/3</Typography>
                <Typography className="block" variant="subheading2">Route Details</Typography>
            </div>
        </div >
        <div className='flex items-center w-44 gap-x-2'>
            <IoBoat className="rounded-full bg-rose-500 border w-11 text-white h-11 p-3 inline" size="20"/>
            <div className='inline-block'>
                <Typography className="block" variant="info">Steps 2/3</Typography>
                <Typography className="block" variant="subheading2">Booking Details</Typography>
            </div>
        </div>
        <div className='flex items-center w-44 gap-x-2'>
            <IoBoat className="rounded-full bg-rose-500 border w-11 text-white h-11 p-3 inline" size="20"/>
            <div className='inline-block'>
                <Typography className="block" variant="info">Steps 3/3</Typography>
                <Typography className="block" variant="subheading2">Confirm</Typography>
            </div>
        </div>
    </div>
  )
}
