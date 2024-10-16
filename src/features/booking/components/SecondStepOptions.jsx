import Typography from "@/components/ui/Typography";
import { MultiStepper } from "@/pages/TripBooking";
import { isActive } from "@/utils/tripBookingUtils";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { GiCarWheel, GiCargoCrate } from "react-icons/gi";
import { PiShippingContainerFill } from "react-icons/pi";
import FillupInfo from "./FillupInfo";
export default function SecondStepOptions() {
  const [isOpen, setIsOpen] = React.useState();
  const { value, setValue } = React.useContext(MultiStepper);
  const rideOptions = [
    { id: 1, icon: <FaUserAlt size={35} />, name: "Passenger" },
    { id: 2, icon: <GiCarWheel size={35} />, name: "Rolling Cargo" },
    { id: 3, icon: <PiShippingContainerFill size={35} />, name: "Drop Caro" },
  ];
  return (
    <div>
      <Typography variant="h3">How do you plan to ride with us?</Typography>
      <Typography variant="small" className={`mt-2 mb-7`}>
        Please choose and fill the fields below .
      </Typography>
      <div className="flex gap-x-2">
        {rideOptions.map((option) => (
          <label
            className={`relative grow flex-col flex items-center justify-center h-40 w-44 cursor-pointer rounded-md border transition-colors duration-300 ${isActive(
              value.option,
              option.id
            )}`}
            key={option.id}>
            <input
              type="radio"
              name="option"
              value={option.id}
              className="hidden"
              onChange={() => {
                setValue((prevState) => ({ ...prevState, option: option.id }));
                setIsOpen(true);
              }}
              checked={value.option === option.id}
            />
            <i>{option.icon}</i>
            <Typography variant="small3" className={`mt-2`}>
              {option.name}
            </Typography>
          </label>
        ))}
      </div>
      <FillupInfo props={{ isOpen, option: value.option, setIsOpen }} />
    </div>
  );
}
