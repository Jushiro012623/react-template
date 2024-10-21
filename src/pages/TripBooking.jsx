import React from "react";
import "../features/booking/assets/index.css";
import { StepTracker, StepController, FirstStepOptions } from "@/features/booking";
import useStepManager from "@/hooks/useStepManager";
import { IoBoat } from "react-icons/io5";
import useDataFetcher from "@/hooks/useDataFetcher";
import SecondStepOptions from "@/features/booking/components/SecondStepOptions";
import ThirdStep from "@/features/booking/components/ThirdStep";

export const MultiStepper = React.createContext()

export default function TripBooking() {
  const stepDetails = [
    { id: 1, icon: <IoBoat />, details: "Route Details" },
    { id: 2, icon: <IoBoat />, details: "Booking Details" },
    { id: 3, icon: <IoBoat />, details: "Confirm" },
  ];
  const { dispatch, state, maxStep } = useStepManager(stepDetails.length);
  const { data: vessels, loading: vesselsLoading, error: vesselsError } = useDataFetcher('vessel');
  // const { data: routes, loading: routesLoading, error: routesError } = useDataFetcher('routes');

  const [value, setValue ] = React.useState({
    vessel: null,
    route: null,
    option: null,
    // discount: null
  })
  console.log(value);
  
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(value);
  };
  let isDisable = true;
  return (
    <MultiStepper.Provider value={{ setValue, value , dispatch}}>
      <section className="w-full h-screen py-[120px] px-[5%]">
        <div className="flex border p-10 rounded-3xl bg-bg max-w-[1280px] mx-auto">
          <div className="mx-auto gap-[96px]">
            <StepTracker props={{ state, stepDetails, maxStep }} />
            <form onSubmit={handleOnSubmit} className='step-body mx-auto mt-24 px-10 rounded-xl flex flex-col border pt-10 bg-white select-none'>
                {(() => {
                switch (state.step) {
                    case 1:
                    isDisable = value.vessel && value.route ? false : true 
                    return <FirstStepOptions props={{ dispatch, state, data: vessels, loading: vesselsLoading, error: vesselsError }} />;
                    case 2:
                    isDisable = value.vessel && value.route ? false : true 
                    return <SecondStepOptions />
                    case 3:
                    isDisable = value.vessel && value.route ? false : true 
                    return <ThirdStep />
                    default:
                    isDisable = true;
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
