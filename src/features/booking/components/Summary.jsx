import Typography from "@/components/ui/Typography";
import React from "react";

import { IoIosArrowRoundForward } from "react-icons/io";
export default function Summary({ value }) {
  // const amount = value.data?.additional && value.data?.type_id === 1
  // ? value.data?.additional + 20000
  // : 20000;
  const amount =
    value.data?.additional && value.data?.type_id === 1
      ? value.data?.additional + 20000
      : 0.0;

  const formattedAmount = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
  return (
    <div className="relative mx-auto w-[400px] border p-10 rounded-xl bg-white">
      <Typography variant="h4" className={``}>
        Summary
      </Typography>
      <Typography
        color="light"
        variant="info"
        className={`w-[300px] text-wrap mt-2 `}>
        This summary provides an overview of your transaction amounts, and
        details.
      </Typography>
      <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-6"></span>
      <div className="items-center w-full mt-5 flex justify-between">
        <Typography className={`text-[14px] font-medium`}>Ticket Number</Typography>
        <div className="flex items-center gap-x-3">
          <Typography color="light" variant="small" className={`uppercase`}>
          GT-{Math.random().toString(36).substring(2, 10000000000)} {/* Get 8 characters */}
          </Typography>
        </div>
      </div>
      <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-5"></span>
      <div className="items-center w-full mt-5 flex justify-between">
        <Typography className={`text-[14px] font-medium`}>Route</Typography>
        {value.details.route.id ? (
          <div className="flex items-center gap-x-3">
            <Typography
              variant="span"
              className={` ${
                value.details.route.type === "out"
                  ? "bg-red-500"
                  : "bg-teal-400"
              } px-3 py-[2px] text-white rounded-md text-[10px]`}>
              {value.details.route.type === "out" ? "Out" : "In"}
            </Typography>
            <Typography color="light" variant="small" className={``}>
              {value.details.route.origin}
            </Typography>
            <IoIosArrowRoundForward />
            <Typography color="light" variant="small" className={``}>
              {value.details.route.destination}
            </Typography>
          </div>
        ) : (
          <Typography color="light" variant="small">
            N/A
          </Typography>
        )}
      </div>

      <div className="items-center w-full mt-3 flex justify-between">
        <Typography className={`text-[14px] font-medium`}>Vessel</Typography>
        <div className="flex items-center gap-x-3">
          <Typography color="light" variant="small" className={``}>
            {value.details.vessel_name ? value.details.vessel_name : "N/A"}
          </Typography>
        </div>
      </div>
      <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-5"></span>
      <div className="items-center w-full mt-5 flex justify-between">
        <Typography className={`text-[14px] font-medium`}>
          Transportation fee
        </Typography>
        <div className="flex items-center gap-x-3">
          <Typography color="light" variant="small" className={``}>
            {value.data?.additional || value.data?.weight
              ? "₱20,000.00"
              : "₱0.00"}{" "}
          </Typography>
        </div>
      </div>

      <div className="items-center w-full mt-3 flex justify-between">
        <Typography className={`text-[14px] font-medium`}>
          Additional fee
        </Typography>

        <div className="flex items-center gap-x-3">
          <Typography color="light" variant="small" className={``}>
            {value.data?.additional && value.data?.type_id === 1
              ? "₱70.00"
              : "₱0.00"}
          </Typography>
        </div>
      </div>
      <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-5"></span>
      <div className="items-center w-full mt-3 flex justify-between">
        <Typography variant="body" className={`font-bold text-blue-400`}>
          Total Amount
        </Typography>
        <div className="flex items-center gap-x-3">
          <Typography color="light" variant="small" className={``}>
            {formattedAmount}
          </Typography>
        </div>
      </div>
      <div className="absolute bottom-3 left-0 w-full flex justify-center">
        <Typography variant="info" className={`mx-auto`}>
          2024 @gameofthrones.dev
        </Typography>
      </div>
    </div>
  );
}
