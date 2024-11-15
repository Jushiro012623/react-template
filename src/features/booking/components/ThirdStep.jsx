import Loader from '@/components/Loader';
import Typography from '@/components/ui/Typography'
import { useAuth } from '@/context/AuthProvider';
import useDataFetcher from '@/hooks/useDataFetcher'
import useGetUser from '@/hooks/useGetUser';
import { MultiStepper } from '@/pages/TripBooking'
import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
export default function ThirdStep() {
    const {setIsDisable, value, user_} = React.useContext(MultiStepper)
    React.useEffect(() => {
      setIsDisable(false);
  }, []);
  return (
    <React.Fragment>
      <div>
        <Typography variant="h3">Confirm your booking information</Typography>
        <Typography variant="small" className={`mt-2 mb-7`}>
          Please take a moment to review and confirm your ticket details.
        </Typography>
        <div className='mt-10 grid grid-cols-4 gap-4 mb-7'>
        <Typography variant='small1' color='primary' className={` uppercase col-span-3 `}>Basic Information</Typography>
        <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 col-span-4"></span>
        <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-5 col-span-2 `}>
          <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Name</Typography>
          <Typography variant='small2' className={`text-gray-600 capitalize `}>{user_?.name || '' }</Typography>
        </div>
        <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-5 col-span-2 `}>
          <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Email</Typography>
          <Typography variant='small2' className={`text-gray-600 lowercase`}>{user_?.email || '' }</Typography>
        </div>
        <Typography variant='small1' color='primary' className={` col-span-3 mt-2 uppercase`}>Booking Details</Typography>
        <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 col-span-4"></span>
        {(() => {
            switch (value.data?.type_id) {
              case 1:
                return (
                  <>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Additional Fee</Typography>
                      <Typography variant='small2' className={`text-gray-600 uppercase `}>{value.data?.additional === "true" ? 'Airconditioned' : 'Basic'}</Typography>
                    </div>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Discount</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.discount?.data?.discount?.name}</Typography>
                    </div>
                  </>
                );
              case 2:
                return (
                  <>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-4 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Vehicle Type</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.vehicle_type}</Typography>
                    </div>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Plate Number</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.plate_number}</Typography>
                    </div>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Weight/KG</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.weight_id}</Typography>
                    </div>
                  </>
                  // <RollingCargo props={{ initialValue, setInitialValue, value }} />
                );
              case 3:
                return (
                  <>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Item Name</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.item_name}</Typography>
                    </div>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Quantity</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.quantity}</Typography>
                    </div>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-3 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Cargo Description</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.cargo_description}</Typography>
                    </div>
                    <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-1 `}>
                      <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Weight/KG</Typography>
                      <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.weight_id}</Typography>
                    </div>
                  </>
                  // <DropCargo props={{ initialValue, setInitialValue, value }} />
                );
              default:
                return <Typography variant="h2">Invalid Option</Typography>;
            }
          })()}
      </div>
      </div>
    </React.Fragment>
  )
}
