import React from 'react'
import { FaCheck} from "react-icons/fa6";
import Typography from '../../../components/ui/Typography';

const StepTracker = ({props}) => {
    const { state, stepDetails } = props

    const stateClass = (state, detail) =>{
        if(state.step > detail.id || state.status === 'complete'){
            return 'bg-stepCompleted text-white'
        }else if (state.step === detail.id){
            return 'bg-stepActive text-white'
        }else{
            return 'bg-transparent  text-gray-400'
        }
    }
    return (
        <div className='rounded-[40px] flex border px-4 py-4 bg-white select-none'>
            {stepDetails.map((detail)=>(
                <div key={detail.id} className='relative step-detail flex items-center mr-16 gap-x-4'>
                    <div className={`step-icon flex items-center justify-center rounded-full transition-colors duration-500 ${stateClass(state, detail)} border w-11  h-11 p-3`} size="20">
                        {state.step > detail.id || state.status === 'complete' ? <FaCheck /> : detail.icon}
                    </div>
                    
                    <div className='inline-block space-y-1'>
                        <Typography className="block font-regular " color='gray' variant="small">Steps {state.id}/{stepDetails.length}</Typography>
                        <Typography className="block" variant="subheading2">{detail.details}</Typography>
                    </div>
                </div >
            ))}
        </div>
  )
}

export default StepTracker