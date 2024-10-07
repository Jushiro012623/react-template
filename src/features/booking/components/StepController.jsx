import React from 'react'
import { FaArrowLeftLong,FaArrowRightLong  } from "react-icons/fa6";
import Button from '../../../components/ui/Button';
 
export default function StepController({ props }) {
    const {state, dispatch, maxStep} = props
    const stepState = (triggerStep, isTrue, isFalse) =>{return state.step === triggerStep ?  isTrue : isFalse }
    
    return (
        <div className='step-body mx-auto mt-24 px-10 rounded-xl flex border pt-10 bg-white select-none'>
            <div className={`step-buttons flex w-full border-t border-dashed py-8 ${state.step === 1 ? 'justify-end' : 'justify-between'}`}>
                <Button onClick={() => {dispatch({ type: "BACK" })} } className={`flex items-center gap-1 justify-center ${state.step === 1 ? 'hidden' : ''} `} type="button" variant='light'>
                    <FaArrowLeftLong />Back
                </Button>
                <Button onClick={() => {
                    if (state.step === maxStep) {
                        dispatch({ type: "COMPLETE" });
                    } else {
                        dispatch({ type: "NEXT" });
                    }
                }}  
                    className={`flex items-center gap-1 justify-center `} type={state.status === 'complete' ? 'submit' : 'button'}
                >
                    {state.step === maxStep ? <>Complete<FaArrowRightLong /></> : <>Next<FaArrowRightLong /></>}
                </Button>
            </div>
        </div>
    )
}
