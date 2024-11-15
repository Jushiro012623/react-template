import Typography from "@/components/ui/Typography";
import { isActive } from "@/utils/tripBookingUtils";
import React from "react";
import { GiShipWheel, GiInterceptorShip, GiCargoShip } from "react-icons/gi";
export default function Vessels({ props }) {
  const { data, setValue, value, setIsOpen } = props;
  const icons = [
        <GiShipWheel size={40} />,
        <GiInterceptorShip size={40} />,
        <GiCargoShip size={40} />,
  ];
  return (
    <div className="flex gap-5">
      {data ? (
        data.map((vessel) => (
          <label
            className={`hover:shadow-md relative grow flex-col flex items-center justify-center h-40 w-44 cursor-pointer rounded-md border transition-colors duration-300 ${isActive(
                value.data?.vessel_id || null,
                vessel.id
            )}`}
            key={vessel.id}>
            <input type="radio" name="vessel" value={vessel.id} className="hidden"
                onChange={() => {
                    setValue((prevState) => ({
                    ...prevState,
                    details: { ...prevState.details, vessel_name: vessel.attributes.name},
                    data:{ ...prevState.data, vessel_id: vessel.id }
                    }));
                    setIsOpen(value.details && value.details.route.id ? false : true);
                }}
                checked={value.data?.vessel_id === vessel.id}
            />

            <Typography>{icons[vessel.id - 1]}</Typography>
            <Typography className="mt-3" variant="small3">
                {vessel.attributes.name}
            </Typography>
            <Typography variant="info">
                {vessel.attributes.description}
            </Typography>
          </label>
        ))
      ) : (
        <Typography variant="small">Loading...</Typography>
      )}
    </div>
  );
}
