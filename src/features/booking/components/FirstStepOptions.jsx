import Typography from "@/components/ui/Typography";
import React from "react";
import { isActive } from "@/utils/tripBookingUtils";
import { MultiStepper } from "@/pages/TripBooking";
import { GiShipWheel, GiInterceptorShip, GiCargoShip  } from "react-icons/gi";
import { IoIosInformationCircle } from "react-icons/io";
import Loadable from "@/routes/Loadable";
import Button from "@/components/ui/Button";
import ChooseRouteModal from "./ChooseRouteModal";

const FirstStepOptions = ({props}) => {
    
    const { data, loading, error, route } = props
    const { setValue, value } = React.useContext(MultiStepper)
    // console.log(value.route);
    
    const icons = [
        <GiShipWheel size={40} />,
        <GiInterceptorShip size={40} />,
        <GiCargoShip size={40} />
    ]
    // console.log(value.route.id);
    
    return (
        <div className="mb-5"> 
            <Typography variant="h3">Let's get started</Typography>
            <Typography variant="small" className={`mt-2 mb-7`}>Which vessel do you intend to ride?</Typography>
            <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                    { data ? (
                        data.map((vessel) => (
                            <div 
                            className={`relative grow flex-col flex items-center justify-center h-40 w-44 cursor-pointer rounded-md border  transition-colors duration-300 ${isActive(value.vessel, vessel.id)}`}
                                onClick={()=>{setValue(prevState => ({ ...prevState, vessel: vessel.id} ))}}
                                key={vessel.id}
                            >
                                <Typography>{icons[vessel.id - 1]}</Typography>
                                <Typography className="mt-3" variant="small3">{vessel.attributes.name}</Typography>
                                <Typography variant="info">{vessel.attributes.description}</Typography>
                            </div>
                        ))

                        ) : (
                            <Typography variant="small">Loading...</Typography>
                    )}
                </div>
                <div>
                    <Typography variant="subheading2" className={`mt-3 mb-1`}>Choose your route</Typography>
                    <Typography variant="info">Lorem ipsum dolor sit amet consectetur.</Typography>
                    <div className={`border h-10 mt-5 rounded-md flex items-center justify-center px-5 mb-3 ${value.route === null ? 'border-gray-200' : 'border-indigo-400' }`}>
                        <Typography variant="small" className={`capitalize`}>
                            {value.route === null ? 'No Chosen Route' : 
                                <React.Fragment>
                                    <span className={`mr-5 ${value.route.type === 'out' ? 'text-red-400' : 'text-teal-400'}`}>{value.route.type}</span>
                                    <span>{value.route.description}</span>
                                </React.Fragment>
                            }
                        </Typography>
                    </div>
                    <ChooseRouteModal />
                </div>
                {/* <Typography variant="info" className={`flex gap-1 italic`} color="warning"><IoIosInformationCircle size={16} /> All fields are required</Typography> */}
            </div>
        </div>
    );
}
export default FirstStepOptions;
