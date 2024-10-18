import Button from "@/components/ui/Button";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput ";
import Typography from "@/components/ui/Typography";
import { MultiStepper } from "@/pages/TripBooking";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { isActive } from "@/utils/tripBookingUtils";
export default function FillupInfo({ props }) {
  const { isOpen, option, setIsOpen } = props;
  const { setValue, value } = React.useContext(MultiStepper);
  const [userDetails, setUserDetails] = React.useState({});
  return (
    <React.Fragment>
      <div
        className={`fixed h-screen w-full bg-gray-500 bg-opacity-75 top-0 z-10 left-0  ${
          isOpen ? "block" : "hidden"
        }`}>
        <div className="absolute left-1/2 -translate-x-1/2 animate-modalDrop">
          <div className="relative z-20 px-8 py-7 w-[550px] bg-white shadow-md rounded-md ">
            <button
              type="button"
              className={`absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full`}
              onClick={() => setIsOpen(false)}>
              <RxCross2 size={20} />
            </button>
            {(() => {
            switch (option) {
                case 1:
                return <Passenger props={{setValue, value}} />;
                case 2:
                return (
                    <h2 className="text-2xl font-semibold">
                    Payment Information
                    </h2>
                );
                default:
                return (
                    <h2 className="text-2xl font-semibold">
                    Fill-up Information
                    </h2>
                );
            }
            })()}

            <div className="mt-5 border-t-2 border-dotted pt-5">
            <Button
                type="button"
                className={`w-full`}
                onClick={() => {
                setValue((prevState) => ({
                    ...prevState,
                    details: userDetails,
                }));
                setIsOpen(false);
                }}>
                Confirm
            </Button>
            <Button
                variant="border"
                type="button"
                className={`w-full mt-2`}
                onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
const Passenger = ({props}) => {
    const { setValue, value } = props
    // const [discount, setDiscount] = useState('regular');
    const handleChange = (event) => {
        setValue(prevState => ({ ...prevState, discount: event.target.value }) );
    };
    
  return (
    <React.Fragment>
        <Typography variant="h4">Passenger</Typography>
        <div className="relative mt-6">
            <Typography variant="small" className={`mt-4 pl-1`}>Select discount</Typography>
            <select name="discount" id="discount" className="text-xs outline-none border w-full h-11 rounded-md px-4" value={value.discount} 
                onChange={handleChange}>
                {/* <option value="0" disabled> </option> */}
                <option className="text-xs" value="regular">Regular</option>
                <option className="text-xs" value="student">Student</option>
                <option className="text-xs" value="pwd_senior">PWD/Senior</option>
                <option className="text-xs" value="hald_fare">Half Fare</option>
                <option className="text-xs" value="minor">Minor</option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 pointer-events-none text-gray-600"/>
            {/* <Typography variant="small" for="discount" className="absolute top-0 left-4 bg-white -translate-y-1/2 px-1">Select Discount</Typography> */}
        </div>
        <Typography variant="small" className={`translate-y-1/2 mt-4 pl-1`}>Add Ons</Typography>
        <div className="flex gap-2 w-full">

            <label
                className={`grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300 ${isActive(value.additional, 1)}`}
            >
                <input
                    type="radio"
                    name="route"
                    value="1"
                    className="hidden"
                    onChange={() => setValue(prevState => ({ ...prevState, additional:1 }) )}
                    checked={value.additional === 1}
                />
                <Typography variant="small" className={`capitalize`}>
                    Airconditioned
                </Typography>
            </label>
            <label
                className={`grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300 ${isActive(value.additional, 0)}`}
            >
                <input
                    type="radio"
                    name="route"
                    value="0"
                    className="hidden"
                    onChange={() => setValue(prevState => ({ ...prevState, additional:0 }) )}
                    checked={value.additional === 0}
                />
                <Typography variant="small" className={`capitalize`}>
                    Basic
                </Typography>
            </label>
        </div>
    </React.Fragment>
  );
};
