import React from 'react'
import { FaArrowLeftLong,FaArrowRightLong  } from "react-icons/fa6";
import Button from '../../../components/ui/Button';
 
export default function StepController({ props }) {
    const {state, dispatch, maxStep, isDisable} = props
    return (
        <div className={`step-buttons flex w-full border-t border-dashed py-8 ${state.step === 1 ? 'justify-end' : 'justify-between'}`}>
            <Button 
                className={`flex items-center gap-1 justify-center ${state.step === 1 ? 'hidden' : ''} `} 
                onClick={() => {dispatch({ type: "BACK" })} } 
                type="button" 
                variant='light'
            >
                <FaArrowLeftLong />Back
            </Button>
            <Button 
                disabled={isDisable}
                className={`flex items-center gap-1 justify-center `} type={state.status === 'complete' ? 'submit' : 'button'}
                onClick={() => {
                    if (state.step === maxStep) {
                        dispatch({ type: "COMPLETE" });
                    } else {
                        dispatch({ type: "NEXT" });
                    }
                }}  
            >
                {state.step === maxStep ? <>Complete<FaArrowRightLong /></> : <>Next<FaArrowRightLong /></>}
            </Button>
        </div>
    )
}
