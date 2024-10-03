import React from "react";
import Button from "../components/core/Button";
import ProgressiveForm from "@/components/booking/ProgressiveForm";
export default function Booking() {
  return (
    <section className="w-full h-screen py-[120px] px-[5%]">
      <div className="flex border p-2 rounded-3xl bg-bg max-w-[1280px] mx-auto">
        <ProgressiveForm />
      </div>
    </section>
  );
}
