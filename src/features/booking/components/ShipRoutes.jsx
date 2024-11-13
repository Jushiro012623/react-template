import Typography from "@/components/ui/Typography";
import { isActive } from "@/utils/tripBookingUtils";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function ShipRoutes({ props }) {
  const { routes, setSelectedRoute, selectedRoute ,value } = props;
  return (
    <React.Fragment>
      {routes
        ? routes.map((route) => (
            <label
              key={route.id}
              className={`hover:shadow-md border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300 ${isActive(
                selectedRoute.id || value.data?.route_id,
                route.id
              )}`}>
              <input
                type="radio"
                name="route"
                value={route.id}
                className="hidden"
                onChange={() =>
                  setSelectedRoute({
                    id: route.id,
                    origin: route.routes.origin,
                    destination: route.routes.destination,
                    type: route.transportationType,
                  })
                }
                checked={selectedRoute.id === route.id}
              />

              <Typography
                variant="span"
                className={`text-[11px] uppercase font-bold w-10 text-center ${
                  route.transportationType === "out"
                    ? "text-red-600 "
                    : "text-teal-500"
                }`}>
                {route.transportationType}
              </Typography>
              <Typography variant="info" color="gray" className={`relative uppercase font-medium tracking-wide w-full justify-between px-10 flex items-center gap-x-3`}>
                {route.routes.origin} <IoIosArrowRoundForward size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" /> {route.routes.destination}
              </Typography>
            </label>
          ))
        : null}
    </React.Fragment>
  );
}
