import Typography from "@/components/ui/Typography";
import React from "react";
import ChooseRouteModal from "./ChooseRouteModal";
import Vessels from "./Vessels";
import MiniLoader from "@/components/ui/MiniLoader";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MultiStepper, useMultiForm } from "@/context/MultiStepperProvider";

const FirstStepOptions = ({props}) => {
    const { data } = props
    const [isOpen, setIsOpen] = React.useState()
    const { setValue, value, setIsDisable } = useMultiForm()
    
    const route = {
        type: value.details.route.type,
        destination: value.details.route.destination,
        origin: value.details.route.origin,
        id: value.details.route.id,
    }
    React.useEffect(() => {
        const isRouteIdValid = Boolean(value.data?.route_id);
        const isVesselIdValid = Boolean(value.data?.vessel_id);
        setIsDisable(!(isRouteIdValid && isVesselIdValid));
    }, [value]);

    if(!data) return <MiniLoader className={`min-h-[405px]`} color={`#6a6a6a`}/>;
    return (
        <div className="mb-5 "> 
            <Typography variant="h3">Let's get started</Typography>
            <Typography variant="small" className={`mt-2 mb-7`}>Which vessel do you intend to ride?</Typography>
            <div className="flex flex-col">
                <Vessels props={{data,setValue,value, setIsOpen}}/>
                <React.Fragment>
                    <Typography variant="subheading2" className={`mt-7 mb-1`}>Choose your route</Typography>
                    <Typography variant="info">We'll bring it to your desired destination.</Typography>
                    <div className={`border h-10 mt-5 rounded-md flex items-center justify-center px-5 mb-3 cursor-pointer hover:shadow-md ${route.id === null ? 'border-gray-200' : 'border-indigo-400 ' }`} onClick={()=>setIsOpen(`${route.id === null  ? 'false' : 'true' }`)} >
                        <Typography variant="small" className={`capitalize`} >
                            {value.details.route.id === null ?  'No Chosen Route' : 
                                <span className="flex items-center justify-center gap-x-3">
                                    <Typography
                                        variant="span"
                                        className={`text-[11px] uppercase font-bold w-10 text-center ${ route.type === "out" ? "text-red-600 " : "text-teal-500" }`}>
                                        {route.type}
                                    </Typography>
                                    <span>
                                        <Typography variant="span" color="gray" className={`text-[11px] relative uppercase font-medium tracking-wide  justify-between flex items-center gap-x-3`}>{route.origin} <IoIosArrowRoundForward size={20}  /> {route.destination}</Typography>
                                    </span>
                                </span>
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
