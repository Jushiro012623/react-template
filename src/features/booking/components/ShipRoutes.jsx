import Typography from "@/components/ui/Typography";
import { isActive } from "@/utils/tripBookingUtils";
import React from "react";

export default function ShipRoutes({ props }) {
  const { routes, setSelectedRoute, selectedRoute ,value } = props;
  return (
    <React.Fragment>
      {routes
        ? routes.map((route) => (
            <label
              key={route.id}
              className={`border h-12 px-5 mt-2 rounded-md cursor-pointer flex items-center gap-10 animate-appear transition-colors duration-300 ${isActive(
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
                variant="small"
                className={`capitalize ${
                  route.transportationType === "out"
                    ? "text-rose-400"
                    : "text-teal-400"
                }`}>
                {route.transportationType}
              </Typography>
              <Typography variant="small">
                {route.routes.origin} - {route.routes.destination}
              </Typography>
            </label>
          ))
        : null}
    </React.Fragment>
  );
}
