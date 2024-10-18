import Typography from "@/components/ui/Typography";
import React from "react";
import { MultiStepper } from "@/pages/TripBooking";
import ChooseRouteModal from "./ChooseRouteModal";
import Vessels from "./Vessels";

const FirstStepOptions = ({props}) => {
    
    const [isOpen, setIsOpen] = React.useState()
    const { data } = props
    const { setValue, value } = React.useContext(MultiStepper)
    return (
        <div className="mb-5"> 
            <Typography variant="h3">Let's get started</Typography>
            <Typography variant="small" className={`mt-2 mb-7`}>Which vessel do you intend to ride?</Typography>
            <div className="flex flex-col">
                <Vessels props={{data,setValue,value, setIsOpen}}/>
                <React.Fragment>
                    <Typography variant="subheading2" className={`mt-7 mb-1`}>Choose your route</Typography>
                    <Typography variant="info">Lorem ipsum dolor sit amet consectetur.</Typography>
                    <div className={`border h-10 mt-5 rounded-md flex items-center justify-center px-5 mb-3 ${value.route === null ? 'border-gray-200' : 'border-indigo-400 cursor-pointer' }`} onClick={()=>setIsOpen(`${value.route === null ? 'false' : 'true' }`)} >
                        <Typography variant="small" className={`capitalize`} >
                            {value.route === null ? 'No Chosen Route' : 
                                <React.Fragment>
                                    <span className={`mr-5 ${value.route.type === 'out' ? 'text-red-400' : 'text-teal-400'}`}>{value.route.type}</span>
                                    <span>{value.route.origin} - {value.route.destination}</span>
                                </React.Fragment>
                            }
                        </Typography>
                    </div>
                    <ChooseRouteModal props={{isOpen, setIsOpen}}/>
                </React.Fragment>
                {/* <Typography variant="info" className={`flex gap-1 italic`} color="warning"><IoIosInformationCircle size={16} /> All fields are required</Typography> */}
            </div>
        </div>
    );
}
export default FirstStepOptions;
