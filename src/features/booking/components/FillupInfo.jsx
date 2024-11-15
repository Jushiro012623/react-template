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
import useDataFetcher from "@/hooks/useDataFetcher";
export default function FillupInfo({ props }) {
  const { isOpen, option, setIsOpen } = props;
  const { setValue, value, dispatch, setIsDisable, headers } = React.useContext(MultiStepper);
  const [initialValue, setInitialValue] = React.useState({});
  const form = isFormValid(option, value, initialValue)
  const { data } = useDataFetcher("weight", null, headers);
  const handleSubmit = (event) => {
    event.preventDefault();
    setValue((prevState) => ({
        ...prevState,
        data: { ...prevState.data, ...initialValue, type_id: option }, 
        discount : { type: 'discount',},
    }));
    setIsOpen(false);
    dispatch({ type: "NEXT" });
  }
  React.useEffect(() => {
      setIsDisable( Boolean(!form) );
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
                    <RollingCargo props={{ initialValue, setInitialValue, value, data }} />
                  );
                case 3:
                  return (
                    <DropCargo props={{ initialValue, setInitialValue, value,data }} />
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
  const discountOptions = [
      { name: 'Regular', value: 1},
      { name: 'PWD/Senior', value: 2},
      { name: 'Half Fare', value: 3},
      { name: 'Minor', value: 4},
    { name: 'Student', value: 5},
  ], addOnsOptions = [
    {name: 'Basic', value: 2},
    {name: 'Airconditioned', value: 1},
  ]
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
          <option className="text-xs capitalize pointer-events-none" >{discountOptions[(initialValue?.discount_id || value.data?.discount_id)]?.name || 'Discount' }</option>
          {discountOptions.map((discount, index) => (
            <option key={index} className={`text-xs`} value={discount.value}>
                {discount.name}
            </option>
          ) ).sort()}
        </select>
        <IoIosArrowDown className="absolute right-3 top-1/2 pointer-events-none text-gray-600" />
      </div>
      
      <Typography variant="small" className={`translate-y-1/2 mt-4 pl-1`}>
        Add Ons
      </Typography>
      <div className="flex gap-2 w-full">
      {addOnsOptions.map((addons, index) => (<label key={index}
        className={`hover:shadow-md grow min-w-[48%] border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300  ${ (initialValue.additional || value.data?.additional) === addons.value ? 'border-indigo-400' : 'border-gray-200'  }`}>
        <input
          type="radio"
          name="route"
          value={addons.value}
          className="hidden"
          onChange={() =>{
            // console.log((initialValue.additional || value.data?.additional) == 1, initialValue.additional || value.data?.additional, 0);
            setInitialValue((prevState) => ({ ...prevState, additional: addons.value }))}
          }
          checked={initialValue.additional === addons.value}
        />
          <Typography variant="small" className={`capitalize`}>
            {addons.name}
          </Typography>
      </label>))}
      {/* <label
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
      </label> */}
      

      </div>
    </React.Fragment>
  );
};
const DropCargo = ({ props }) => {
    const { initialValue, setInitialValue, value, data } = props;
  return (
    <React.Fragment>
      <Typography variant="h4">Drop Cargo</Typography>
      <div className="flex flex-col gap-3 mt-6 w-full">
        <Selects 
            name="Weight/Kg" 
            value={value} 
            data={data} 
            state="weight_id" 
            setInitialValue={setInitialValue}
            initialValue={initialValue} 
        />
        <InputValue label="Item Name" value={initialValue.item_name} setInitialValue={setInitialValue} state="item_name" />
        <InputValue label="Cargo Description" value={initialValue.cargo_description} setInitialValue={setInitialValue} state="cargo_description" />
        <InputValue type="number" label="Quantity" value={initialValue.quantity} setInitialValue={setInitialValue} state="quantity" />

        {/* <InputValue type="number" label="Weight/KG" value={initialValue.weight} setInitialValue={setInitialValue} state="weight" /> */}
      </div>
    </React.Fragment>
  );
};
const RollingCargo = ({ props }) => {
    const { initialValue, setInitialValue, value, data } = props;
  
    return (
      <React.Fragment>
        <Typography variant="h4">Rolling Cargo</Typography>
        <div className="flex flex-col gap-3 mt-6 w-full">
          <Selects 
            name="Weight/Kg" 
            value={value} 
            data={data} 
            state="weight_id" 
            setInitialValue={setInitialValue}
            initialValue={initialValue}
          />
          <InputValue 
            label="Vehicle Type" 
            value={initialValue.vehicle_type} 
            setInitialValue={setInitialValue} 
            state="vehicle_type" 
          />
          <InputValue 
            label="Plate Number" 
            value={initialValue.plate_number} 
            setInitialValue={setInitialValue} 
            state="plate_number" 
          />
        </div>
      </React.Fragment>
    );
  };
  
const Selects = ({ name, value, data, state, setInitialValue, initialValue}) => {
    const handleChange = (event) => {
        setInitialValue((prevState) => ({
          ...prevState,
          [state]: event.target.value,
        }));
        console.log(initialValue);
    };
    return (
      <div className="relative">
        <Typography variant="small" className="pl-1">
          {name}
        </Typography>
        <select
          name={state}
          id={state}
          className="hover:shadow-md capitalize text-xs outline-none border w-full h-11 rounded-md px-4"
          onChange={handleChange}
        >
          <option className="text-xs capitalize pointer-events-none">
            {(value?.[state] || initialValue?.[state] || 'Select Option')}
          </option>
          {data?.map((data, index) => (
            <option
              key={index}
              className={`text-xs`}
              value={data.id} 
            >
              {data.name}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="absolute right-3 top-1/2 pointer-events-none text-gray-600" />
      </div>
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

