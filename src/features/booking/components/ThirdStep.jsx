import Typography from '@/components/ui/Typography'
import { useAuth } from '@/context/AuthProvider';
import { MultiStepper, useMultiForm } from '@/context/MultiStepperProvider';
import React from 'react'
export default function ThirdStep() {
    const {setIsDisable, value} = useMultiForm()
    const {user} = useAuth()
    React.useEffect(() => {
      setIsDisable(false);
    }, []);
  return (
    <React.Fragment>
      <div>
        <Typography variant="h3">Confirm your booking information</Typography>
        <Typography variant="small" className={`mt-2 mb-7`}> Please take a moment to review and confirm your ticket details. </Typography>
        <div className='mt-10 grid grid-cols-4 gap-4 mb-7'>
        <Typography variant='small1' color='primary' className={` uppercase col-span-3 `}>Basic Information</Typography>
        <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 col-span-4"></span>
        <InputReview value={user.name || '' } label={'Name'} />
        <InputReview value={user.email || ''  } label={'Email'} />
        <Typography variant='small1' color='primary' className={` col-span-3 mt-2 uppercase`}>Booking Details</Typography>
        <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 col-span-4"></span>
        {value.data?.type_id === 1 && 
            <React.Fragment>
                <InputReview value={value.data?.additional === "true" ? 'AIRCONDITIONED' : 'BASIC'} label={'Additional Fee'} />
                <InputReview value={value.discount?.data?.discount?.name} label={'Discount'} />
            </React.Fragment>
        }
        {value.data?.type_id === 2 && 
            <React.Fragment>
                <InputReview value={value.data?.vehicle_type} label={'Vehicle Type'} />
                <InputReview value={value.data?.plate_number} label={'Plate Number'} />
                <InputReview value={value.data?.weight_id} label={'Weight/KG'} />
          </React.Fragment>
        }
        {value.data?.type_id === 3 && 
            <React.Fragment>
                <InputReview value={value.data?.item_name} label={'Item Name'} />
                <InputReview value={value.data?.quantity} label={'Quantityr'} />
                <InputReview value={value.data?.cargo_description} label={'Cargo Description'} />
                <InputReview value={value.data?.weight_id} label={'Weight/KG'} />
          </React.Fragment>
        }

      </div>
      </div>
    </React.Fragment>
  )
}
const InputReview = ({value, label}) => {
    return (
        <div className={`relative border rounded-md p-4 bg-white transition-transform transform mt-4 col-span-2 `}>
            <Typography variant='small2' className="absolute top-0 -translate-y-5 left-0 font-semibold text-gray-700 mb-1">{label}</Typography>
            <Typography variant='small2' className={`text-gray-600 capitalize `}>{value}</Typography>
        </div>
    )
}