import Typography from '@/components/ui/Typography'
import useDataFetcher from '@/hooks/useDataFetcher'
import { MultiStepper } from '@/pages/TripBooking'
import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
export default function ThirdStep() {
    const {setValue, value} = React.useContext(MultiStepper)
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
            // { customStyle: 'col-span-3', label: 'Discount Type', value: data.discount || 'N/A' },
            // { customStyle: 'col-span-1', label: 'Discounted Fare', value: data.discounted_fare },
            // { customStyle: 'col-span-2', label: 'Base Fare', value: data.base_fare },
            // { customStyle: 'col-span-2', label: 'Additional Fee', value: data.additional_fee || 'N/A' },
            // { customStyle: 'col-span-4', label: 'Total Amount', value:data.total_amount },
          ].map((item, index) => (
            <div key={index} className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 ${item.customStyle}`}>
              <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">{item.label}</Typography>
              <Typography variant='small2' className={`text-gray-600 capitalize `}>{item.value}</Typography>
            </div>
          ))}
        </div>

        </div>
    </React.Fragment>
  )
}
