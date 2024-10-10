import Typography from "@/components/ui/Typography";
import React from "react";
import { isActive } from "@/utils/tripBookingUtils";
import { MultiStepper } from "@/pages/TripBooking";

const VesselOptions = ({props}) => {
    const { setValue, value } = React.useContext(MultiStepper)

    const { data, loading, error } = props
    
    if (loading) return <Typography variant="small">Loading...</Typography>;
    if (error) return <Typography variant="small">Error: {error}</Typography>;

    return (
        <div className="mb-10"> 
            <Typography variant="h3">Which vessel do you intend to ride?</Typography>
            <Typography variant="small" className={`mt-2 mb-10`}>Please select one of the available options below.</Typography>
            <div className="flex gap-5">
            {data.map((vessel) => (
                <div 
                className={`grow flex items-center justify-center h-40 w-44 cursor-pointer rounded-md border  transition-colors duration-500 ${isActive(value.vessel, vessel.id)}`}
                    onClick={()=>{setValue(prevState => ({ ...prevState, vessel: vessel.id} ))}}
                    key={vessel.id}
                >
                    {vessel.attributes.name}
                </div>
            ))}
            </div>
        </div>
    );
}
export default VesselOptions;
