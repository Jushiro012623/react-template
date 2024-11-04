import Typography from '@/components/ui/Typography'
import useDataFetcher from '@/hooks/useDataFetcher'
import { MultiStepper } from '@/pages/TripBooking'
import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
export default function ThirdStep() {
    const {setIsDisable, value} = React.useContext(MultiStepper)
    React.useEffect(() =>{
      setIsDisable(false)
    },[])
  return (
    <React.Fragment>
        <div>
          <Typography variant="h3">Ticket Summary</Typography>
          <Typography variant="small" className={`mt-2 mb-7`}>
            Please take a moment to review and confirm your ticket details.
          </Typography>
          <div className='mt-10 grid grid-cols-4 gap-4'>
          {[
            { customStyle: 'col-span-2', label: 'Origin', value: value.details.route.origin },
            { customStyle: 'col-span-2', label: 'Destination', value: value.details.route.destination },
            { customStyle: 'col-span-3', label: 'Vessel Name', value:value.details.vessel_name },
            { customStyle: 'col-span-1', label: 'Route Type', value: value.details.route.type },
            { customStyle: 'col-span-2', label: 'Ride Type', value: value.data.type_id === 1 ? 'Passenger' : (value.option === 2 ? 'Rolling Cargo' : 'Drop Cargo') },
            { customStyle: 'col-span-2', label: 'Email', value: 'Email' },
            { customStyle: 'col-span-4', label: 'Name', value: 'Name' },
            // { customStyle: 'col-span-1', label: 'Discounted Fare', value: data.discounted_fare },
            // { customStyle: 'col-span-2', label: 'Base Fare', value: data.base_fare },
            // { customStyle: 'col-span-4', label: 'Total Amount', value:data.total_amount },
          ].map((item, index) => (
            <div key={index} className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 ${item.customStyle}`}>
              <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">{item.label}</Typography>
              <Typography variant='small2' className={`text-gray-600 capitalize `}>{item.value}</Typography>
            </div>
          ))}
           {(() => {
              switch (value.data?.type_id) {
                case 1:
                  return (
                    <>
                      <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                        <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Additional Fee</Typography>
                        <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.additional === "true" ? 'Airconditioned' : 'Basic'}</Typography>
                      </div>
                      <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
                        <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Discount</Typography>
                        <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.discount}</Typography>
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
                        <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.weight}</Typography>
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
                        <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.description}</Typography>
                      </div>
                      <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-1 `}>
                        <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">Weight/KG</Typography>
                        <Typography variant='small2' className={`text-gray-600 capitalize `}>{value.data?.weight}</Typography>
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
