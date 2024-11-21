import React, { Children } from 'react'
import { useAuth } from './AuthProvider';
import useStepManager from '@/hooks/useStepManager';
import { IoBoat } from "react-icons/io5";
import { VALUE_FORMAT } from '@/utils/tripBookingUtils';

export const MultiStepper = React.createContext();
export default function MultiStepperProvider({children}) {
    const stepDetails = [
        { id: 1, icon: <IoBoat />, details: "Route Details" },
        { id: 2, icon: <IoBoat />, details: "Booking Details" },
        { id: 3, icon: <IoBoat />, details: "Confirm" },
    ];
    
    const user = useAuth();
    const [user_, serUser_] = React.useState({})
    const  headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
    }
    const [isDisable, setIsDisable] = React.useState(true)
    const { dispatch, state, maxStep } = useStepManager(stepDetails.length)
    const [value, setValue] = React.useState(VALUE_FORMAT)   

    const contextValue = { stepDetails,setValue, value, dispatch, state, setIsDisable, user_, headers, serUser_, isDisable, maxStep}

    return <MultiStepper.Provider value={contextValue}>
        {children}
    </MultiStepper.Provider>
    
}
