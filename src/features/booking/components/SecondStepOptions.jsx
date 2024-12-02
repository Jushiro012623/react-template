import Typography from "@/components/ui/Typography";
import { isActive } from "@/utils/tripBookingUtils";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { PiShippingContainerFill } from "react-icons/pi";
import FillupInfo, { InputValue } from "./FillupInfo";
import { useMultiForm } from "@/context/MultiStepperProvider";
export default function SecondStepOptions({}) {

  const [isOpen, setIsOpen] = React.useState();
  const { value } = useMultiForm()
  
  const [initialValue, setInitialValue] = React.useState()
    const rideOptions = [
        { id: 1, icon: <FaUserAlt size={35} />, name: "Passenger" },
        { id: 2, icon: <GiCarWheel size={35} />, name: "Rolling Cargo" },
        { id: 3, icon: <PiShippingContainerFill size={35} />, name: "Drop Caro" },
    ];
  return (
    <div className="">
      <Typography variant="h3">How do you plan to ride with us?</Typography>
      <Typography variant="small" className={`mt-2 mb-7`}>
        Please choose and fill the fields below .
      </Typography>
      <div className="flex gap-x-2 mb-7">
        {rideOptions.map((option) => (
          <label
            className={`hover:shadow-md relative grow flex-col flex items-center justify-center h-40 w-44 cursor-pointer rounded-md border transition-colors duration-300 ${isActive(
              value.data?.type_id,
              option.id
            )}`}
            key={option.id}>
            <input type="radio" name="option" value={option.id} className="hidden" onClick={()=> {setIsOpen(true); setInitialValue(option.id)}}
              onChange={() => {
                setIsOpen(true);
              }}
              checked={value.data?.type_id === option.id}
            />
            <i>{option.icon}</i>
            <Typography variant="small3" className={`mt-2`}> {option.name} </Typography>
          </label>
        ))}
      </div>
        {/* <Typography variant="subheading2" className={`mt-7 mb-1`}>Who's riding with us?</Typography>
        <Typography variant="info">Please fillup the fields.</Typography> 
        <div className="flex gap-2 w-full mt-6">
            <div className="w-full">
                <InputValue label="Name" value={initialValue?.name} setInitialValue={setInitialValue} state="name" />
            </div>
            <div className="w-full">
                <InputValue label="Email Address" type="email" value={initialValue?.email} setInitialValue={setInitialValue} state="email" />   
            </div>
        </div> */}
      <FillupInfo props={{ isOpen, option: initialValue, setIsOpen
      }} />
    </div>
  );
}
