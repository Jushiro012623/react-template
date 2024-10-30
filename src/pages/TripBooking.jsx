import React from "react";
import "../features/booking/assets/index.css";
import { StepTracker, StepController, FirstStepOptions } from "@/features/booking";
import useStepManager from "@/hooks/useStepManager";
import { IoBoat } from "react-icons/io5";
import useDataFetcher from "@/hooks/useDataFetcher";
import SecondStepOptions from "@/features/booking/components/SecondStepOptions";
import ThirdStep from "@/features/booking/components/ThirdStep";
import useSubmitData from "@/hooks/useSubmitData";
export const MultiStepper = React.createContext()

export default function TripBooking() {
  const stepDetails = [
    { id: 1, icon: <IoBoat />, details: "Route Details" },
    { id: 2, icon: <IoBoat />, details: "Booking Details" },
    { id: 3, icon: <IoBoat />, details: "Confirm" },
  ];
  const { dispatch, state, maxStep } = useStepManager(stepDetails.length);
  const { data: vessels, loading: vesselsLoading, error: vesselsError } = useDataFetcher('vessel');
  const [isDisable, setIsDisable] = React.useState(true)
  // let isDisable = true
  const { error, loading, response, submitData } = useSubmitData()
  const ticketForm = React.useRef()
  const [value, setValue ] = React.useState({
    details:{
      route: {
        type:null,
        origin:null,
        destination:null,
        id:null
      }
    },
    data:null,
  })
  const payload = (value) => {
    return {route_id: value.route.id,
      type_id:value.option,
      additional:value.details.additional || 0,
      vessel_id: value.vessel.id,
      weight:value.details.rolling_weight || value.details.drop_weight || null,
      discount: value.details.discount || 'regular',
      vehicle_type:value.details.vehicle_type || null,
      plate_number:value.details.plate_number || null,
      cargo_description:value.details.cargo_description || null,
      item_name:value.details.item_name || null,
      quantity:value.details.quantity || null,
      payment_method_id:1}
  }
  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN'
  }
  console.log(value);
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // submitData('ticket', payload(value), headers)
    const formdata = new FormData(ticketForm);
     console.log(formdata);
    
    if(response){
      console.log(response);
    }
  };
  return (
    <MultiStepper.Provider value={{ setValue, value , dispatch, state ,setIsDisable}}>
      <section className="w-full h-screen py-[120px] px-[5%]">
        <div className="flex border p-10 rounded-3xl bg-bg max-w-[1280px] mx-auto">
          <div className="mx-auto gap-[96px]">
            <StepTracker props={{ state, stepDetails, maxStep }} />
            <form onSubmit={handleOnSubmit} ref={ticketForm} className='ticket-form step-body mx-auto mt-24 px-10 rounded-xl flex flex-col border pt-10 bg-white select-none max-w-[652.11px]'>
                {(() => {
                switch (state.step) {
                    case 1:

                      return <FirstStepOptions props={{ data: vessels, loading: vesselsLoading, error: vesselsError }} />;
                    case 2:
                      return <SecondStepOptions />
                    case 3:
                      return <ThirdStep />
                    default:
                    // isDisable = true;
                    return <p>Default</p>;
                }
                })()}
                <StepController props={{ dispatch, state, maxStep, isDisable}} />
            </form>
          </div>
        </div>
      </section>
    </MultiStepper.Provider>
  );
}
