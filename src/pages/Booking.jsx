import React from "react";
import "../features/booking/assets/index.css";
import StepInfo from "@/features/booking/components/StepInfo";
import StepController from "@/features/booking/components/StepController";
import useStepper from "@/features/booking/hooks/useStepper";
import { IoBoat } from "react-icons/io5";
export default function Booking() {
  const stepDetails = [
    { id: 1, icon: <IoBoat />, details: "Route Details" },
    { id: 2, icon: <IoBoat />, details: "Booking Details" },
    { id: 3, icon: <IoBoat />, details: "Confirm" },
  ];
  const { dispatch, state, maxStep } = useStepper(stepDetails.length);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
  };
  return (
    <section className="w-full h-screen py-[120px] px-[5%]">
      <div className="flex border p-10 rounded-3xl bg-bg max-w-[1280px] mx-auto">
        <div className="mx-auto gap-[96px]">
          <StepInfo props={{ state, stepDetails, maxStep }} />
          <form onSubmit={handleOnSubmit}>
            <StepController props={{ dispatch, state, maxStep }} />
          </form>
        </div>
      </div>
    </section>
  );
}
