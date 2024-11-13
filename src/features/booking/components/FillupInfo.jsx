import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { MultiStepper } from "@/pages/TripBooking";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { isFormValid } from "@/utils/tripBookingUtils";
import { submitData } from "@/utils/submitData";
import { useAuth } from "@/context/AuthProvider";
export default function FillupInfo({ props }) {
  const { isOpen, option, setIsOpen } = props;
  const { setValue, value, dispatch, setIsDisable } = React.useContext(MultiStepper);
  const [initialValue, setInitialValue] = React.useState({});
  const form = isFormValid(option, value, initialValue)
  const user = useAuth()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
      try{
        const res = await submitData('fare/transactionFare', {
          'discount_id': parseInt(initialValue.discount_id),
          'type_id': value.data?.type_id,
          'route_id': value.data?.route_id,
          'weight': initialValue.weight || {}
        }, headers)
        setValue((prevState) => ({
          ...prevState,
          data: { ...prevState.data, ...initialValue,  },
          discount : res.data
        }));
        setIsOpen(false);
        dispatch({ type: "NEXT" });
      }catch (err) {
        console.error(err);
      }
  }
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
                onClick={handleSubmit}>
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
  // const radioValue = [true,false]
  const handleChange = (event) => {
    setInitialValue((prevState) => ({
      ...prevState,
      discount_id: event.target.value,
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
          name="discount_id"
          id="discount_id"
          className="hover:shadow-md capitalize text-xs outline-none border w-full h-11 rounded-md px-4"
          onChange={handleChange}>
          <option className="text-xs capitalize pointer-events-none">discount</option>
          <option className={`text-xs ${ (initialValue.discount_id || value.data?.discount_id) === 'regular' ? 'bg-red-300' : null}`} value="1">
            Regular
          </option>
          <option className={`text-xs ${value.data?.discount_id === 'student' ? 'bg-red-300' : null }`} value="5">
            Student
          </option>
          <option className="text-xs" value="2">
            PWD/Senior
          </option>
          <option className="text-xs" value="3">
            Half Fare
          </option>
          <option className="text-xs" value="4">
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
        className={`hover:shadow-md grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300  ${ (initialValue.additional || value.data?.additional) === 1 ? 'border-indigo-400' : 'border-gray-200'  }`}>
        <input
          type="radio"
          name="route"
          value={1}
          className="hidden"
          onChange={() =>{
            // console.log((initialValue.additional || value.data?.additional) == 1, initialValue.additional || value.data?.additional, 0);
            setInitialValue((prevState) => ({ ...prevState, additional: 1 }))}
          }
          checked={initialValue.additional === 1}
        />
          <Typography variant="small" className={`capitalize`}>
            Airconditioned
          </Typography>
      </label>
      <label
        className={`hover:shadow-md grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300  ${ (initialValue.additional || value.data?.additional) === 2 ? 'border-indigo-400' : 'border-gray-200'  }`}>
        <input
          type="radio"
          name="route"
          value={2}
          className="hidden"
          onChange={() =>{
            // console.log((initialValue.additional || value.data?.additional) == 1, initialValue.additional || value.data?.additional, 0);
            setInitialValue((prevState) => ({ ...prevState, additional: 2 }))}
          }
          checked={initialValue.additional === 2}
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
        <InputValue label="Item Name" value={initialValue.item_name} setInitialValue={setInitialValue} state="item_name" />
        <InputValue label="Cargo Description" value={initialValue.cargo_description} setInitialValue={setInitialValue} state="cargo_description" />
        <InputValue type="number" label="Quantity" value={initialValue.quantity} setInitialValue={setInitialValue} state="quantity" />
        <InputValue type="number" label="Weight/KG" value={initialValue.weight} setInitialValue={setInitialValue} state="weight" />
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
        <InputValue label="Vehicle Type" value={initialValue.vehicle_type} setInitialValue={setInitialValue} state="vehicle_type" />
        <InputValue type="number" label="Weight/KG" value={initialValue.weight} setInitialValue={setInitialValue} state="weight" />
        <InputValue label="Plate Number" value={initialValue.plate_number} setInitialValue={setInitialValue} state="plate_number" />
      </div>
    </React.Fragment>
  );
};

const InputValue = ({label, value, setInitialValue, state, type = "text"}) => {
  return <InputWithLabel
  className={`w-full hover:shadow-md focus:shadow-md `}
  type={type}
  label={label}
  value={value}
  onChange={(e) =>
    setInitialValue((prevState) => ({
      ...prevState,
      [state] : e.target.value,
    }))
  }
/>
}
