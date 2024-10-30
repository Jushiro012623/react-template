import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { MultiStepper } from "@/pages/TripBooking";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { isActive } from "@/utils/tripBookingUtils";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { isFormValid } from "@/utils/tripBookingUtils";
export default function FillupInfo({ props }) {
  const { isOpen, option, setIsOpen } = props;
  const { setValue, value, dispatch, setIsDisable } = React.useContext(MultiStepper);
  const [initialValue, setInitialValue] = React.useState({});
  const form = isFormValid(option, value, initialValue)
  React.useEffect(() => {
    setIsDisable( Boolean(!form) );
    console.log( Boolean(!form));
}, [value]);
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
              onClick={() => {
                setIsOpen(false);
              }}>
              <RxCross2 size={20} />
            </button>
            {(() => {
              switch (option) {
                case 1:
                  return (
                    <Passenger props={{ initialValue, setInitialValue, value }} />
                  );
                case 2:
                  return (
                    <RollingCargo props={{ initialValue, setInitialValue, value }} />
                  );
                case 3:
                  return (
                    <DropCargo props={{ initialValue, setInitialValue, value }} />
                  );
                default:
                  return <Typography variant="h2">Invalid Option</Typography>;
              }
            })()}
            <div className="mt-5 border-t-2 border-dotted pt-5">
              <Button
                type="button"
                className={`w-full`}
                disabled={!form}
                onClick={() => {
                  setValue((prevState) => ({
                    ...prevState,
                    data: { ...prevState.data, ...initialValue },
                  }));
                  setIsOpen(false);
                  dispatch({ type: "NEXT" });
                }}>
                Confirm
              </Button>
              <Button
                variant="border"
                type="button"
                className={`w-full mt-2`}
                onClick={() => {
                  setIsOpen(false);
                }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
const Passenger = ({ props }) => {
  const { initialValue, setInitialValue,value } = props;
  const radioValue = ['true','false']
  const handleChange = (event) => {
    setInitialValue((prevState) => ({
      ...prevState,
      discount: event.target.value,
    }));
  };
  return (
    <React.Fragment>
      <Typography variant="h4">Passenger</Typography>
      <div className="relative mt-6">
        <Typography variant="small" className={`mt-4 pl-1`}>
          Select discount
        </Typography>
        <select
          name="discount"
          id="discount"
          className="capitalize text-xs outline-none border w-full h-11 rounded-md px-4"
          onChange={handleChange}>
          <option className="text-xs capitalize pointer-events-none" disabled>Discount</option>
          <option className={`text-xs ${ value.data?.discount === 'regular' ? 'bg-red-300' : null}`} value="regular">
            Regular
          </option>
          <option className={`text-xs ${value.data?.discount === 'student' ? 'bg-red-300' : null }`} value="student">
            Student
          </option>
          <option className="text-xs" value="pwd_senior">
            PWD/Senior
          </option>
          <option className="text-xs" value="half_fare">
            Half Fare
          </option>
          <option className="text-xs" value="minor">
            Minor
          </option>
        </select>
        <IoIosArrowDown className="absolute right-3 top-1/2 pointer-events-none text-gray-600" />
      </div>
      <Typography variant="small" className={`translate-y-1/2 mt-4 pl-1`}>
        Add Ons
      </Typography>
      <div className="flex gap-2 w-full">
      <label
        className={`grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300  ${ (initialValue.additional || value.data?.additional) === radioValue[0] ? 'border-indigo-400' : 'border-gray-200'  }`}>
        <input
          type="radio"
          name="route"
          value={radioValue[0]}
          className="hidden"
          onChange={() =>{
            // console.log((initialValue.additional || value.data?.additional) == 1, initialValue.additional || value.data?.additional, 0);
            setInitialValue((prevState) => ({ ...prevState, additional: radioValue[0] }))}
          }
          checked={initialValue.additional === radioValue[0]}
        />
          <Typography variant="small" className={`capitalize`}>
            Airconditioned
          </Typography>
      </label>
      <label
        className={`grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300  ${ (initialValue.additional || value.data?.additional) === radioValue[1] ? 'border-indigo-400' : 'border-gray-200'  }`}>
        <input
          type="radio"
          name="route"
          value={radioValue[1]}
          className="hidden"
          onChange={() =>{
            // console.log((initialValue.additional || value.data?.additional) == 1, initialValue.additional || value.data?.additional, 0);
            setInitialValue((prevState) => ({ ...prevState, additional: radioValue[1] }))}
          }
          checked={initialValue.additional === radioValue[1]}
        />
          <Typography variant="small" className={`capitalize`}>
            Basic
          </Typography>
      </label>
      

      </div>
    </React.Fragment>
  );
};
const DropCargo = ({ props }) => {
  const { initialValue, setInitialValue, value } = props;
  return (
    <React.Fragment>
      <Typography variant="h4">Drop Cargo</Typography>
      <div className="flex flex-col gap-3 mt-6 w-full">
        <InputWithLabel
          className={`w-full`}
          type="text"
          label="Item Name"
          value={value.data?.item_name || initialValue.item_name}
          onChange={(e) =>
            setInitialValue((prevState) => ({
              ...prevState,
              item_name: e.target.value,
            }))
          }
        />
        <InputWithLabel
          className={`w-full`}
          type="text"
          label="Cargo Description"
          value={value.data?.description || initialValue.description}
          onChange={(event) =>
            setInitialValue((prevState) => ({
              ...prevState,
              description: event.target.value,
            }))
          }
        />
        <InputWithLabel
          className={`w-full`}
          type="number"
          label="Quantity"
          value={value.data?.quantity || initialValue.quantity}
          onChange={(event) =>
            setInitialValue((prevState) => ({
              ...prevState,
              quantity: event.target.value,
            }))
          }
        />
        <InputWithLabel
          className={`w-full`}
          type="number"
          label="Weight/KG"
          value={value.data?.weight || initialValue.weight}
          onChange={(event) =>
            setInitialValue((prevState) => ({
              ...prevState,
              weight: event.target.value,
            }))
          }
        />
      </div>
    </React.Fragment>
  );
};
const RollingCargo = ({ props }) => {
  const { initialValue, setInitialValue, value } = props;
  return (
    <React.Fragment>
      <Typography variant="h4">Rolling Cargo</Typography>
      <div className="flex flex-col gap-3 mt-6 w-full">
        <InputWithLabel
          className={`w-full`}
          type="text"
          label="Vehicle Type"
          value={value.data?.vehicle_type || initialValue.vehicle_type}
          onChange={(event) =>
            setInitialValue((prevState) => ({
              ...prevState,
              vehicle_type: event.target.value,
            }))
          }
        />
        <InputWithLabel
          className={`w-full`}
          type="text"
          label="Plate Number"
          value={value.data?.plate_number || initialValue.plate_number}
          onChange={(event) =>
            setInitialValue((prevState) => ({
              ...prevState,
              plate_number: event.target.value,
            }))
          }
        />
        <InputWithLabel
          className={`w-full`}
          type="number"
          label="Weight/KG"
          value={value.data?.weight || initialValue.weight}
          onChange={(event) =>
            setInitialValue((prevState) => ({
              ...prevState,
              weight: event.target.value,
            }))
          }
        />
      </div>
    </React.Fragment>
  );
};
