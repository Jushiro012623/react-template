import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { useMultiForm } from '@/context/MultiStepperProvider';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import React from 'react'
import { FaCheck  } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';
import complete from '../assets/mail.svg'
import Navbar from '@/components/Navbar';
export default function BookingComplete() {
    const { state, dispatch } = useMultiForm()
    
    useDocumentTitle("Booking | Complete");
    if(state.status !== 'done'){
        return <Navigate to="/"/>
    }
    return (
        <React.Fragment>
            <Navbar />
            <div className='w-full h-screen'>
                <div className='fixed w-full h-screen flex items-center justify-center'>
                    <div className='relative w-[700px]  h-auto flex flex-col items-center pt-5 pb-5 px-5 text-center rounded-xl'>
                        {/* <div className='relative bg-green-200 rounded-full h-28 w-28 grid place-content-center z-[6]'>
                            <span className='w-[90px] h-[90px] -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 rounded-full z-[8] bg-green-400'></span>
                            <FaCheck  className='rounded-full bg-green-500 h-16 w-16 p-4 text-white z-[9]'/>
                        </div> */}
                        <img src={complete} alt="" className='w-[300px]'/>
                        <Typography variant='h4' className={`!font-bold mt-10`}>Your booking was completed successfully!</Typography>
                        <Typography variant='small' className={`mt-2`}>We've sent a confirmation email with your booking details and tracking information to your inbox.</Typography>
                        <Link to="/" className='translate-y-full'> <Button className={`w-full`} onClick={()=>{dispatch({ type: "RESET" })}}> Go back to dashboard</Button> </Link> 
                        {/* <Typography variant='info' className={`absolute bottom-0  translate-y-24 mt-5 w-1/2`}>Need help? Contact our support team at <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a>.</Typography> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
            
    )
}
