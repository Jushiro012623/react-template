import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { MultiStepper } from '@/context/MultiStepperProvider';
import React from 'react'
import { FaCheck  } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function BookingComplete() {
    const { state } = React.useContext(MultiStepper);
    // const navigate = useNavigate();
    if(state.status !== 'complete'){
        // return navigate('/')
        return <Navigate to="/"/>
    }
    return (
        <React.Fragment>
            <div className='fixed w-full h-screen flex items-center justify-center'>
                <div className='relative w-[700px] -translate-y-16 h-auto flex flex-col items-center pt-5 pb-5 px-5 text-center rounded-xl'>
                    <div className='relative bg-green-200 rounded-full h-28 w-28 grid place-content-center z-[6]'>
                        <span className='w-[90px] h-[90px] -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 rounded-full z-[8] bg-green-400'></span>
                        <FaCheck  className='rounded-full bg-green-500 h-16 w-16 p-4 text-white z-[9]'/>
                    </div>
                    <Typography variant='h4' className={`!font-bold mt-4`}>Your booking was completed successfully</Typography>
                    <Typography variant='small2' className={`mt-2`}>We've sent a confirmation email with your booking details and tracking information to your inbox.</Typography>
                    <Link to="/" className='translate-y-full  mt-6'> <Button className={`w-full`}> Go back to dashboard</Button> </Link> 
                    {/* <Typography variant='info' className={`absolute bottom-0  translate-y-24 mt-5 w-1/2`}>Need help? Contact our support team at <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a>.</Typography> */}
                </div>
            </div>
        </React.Fragment>
            
    )
}
