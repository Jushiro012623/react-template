import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import React from 'react'
import { FaCheck  } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function BookingComplete() {
    return (
        <React.Fragment>
            <div className='fixed w-full h-screen flex items-center justify-center'>
                <div className='shadow-lg shadow-slate-400 w-[500px] h-auto flex flex-col items-center pt-5 pb-5 px-5 text-center rounded-xl bg-white'>
                    <div className='bg-green-200 w-12 rounded-full h-12 grid place-content-center'>
                        <FaCheck  className='rounded-full bg-green-400 h-7 w-7 p-2 text-white'/>
                    </div>
                    <Typography variant='h3'>Success !</Typography>
                    <Typography variant='info' className={`mt-4`}>Your booking was successfully completed. A confirmation email with your booking details and tracking information has been sent to you.</Typography>
                    <Link to="/" className='bg-red-100 mt-6  w-full'> <Button className={` w-full`}> Go back to dashboard</Button> </Link> 
                </div>
            </div>
        </React.Fragment>
            
    )
}
