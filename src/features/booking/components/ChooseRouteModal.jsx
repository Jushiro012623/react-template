import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import useDataFetcher from "@/hooks/useDataFetcher";
import { isActive } from "@/utils/tripBookingUtils";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import ShipRoutes from "./ShipRoutes";
import MiniLoader from "@/components/ui/MiniLoader";
import { MultiStepper, useMultiForm } from "@/context/MultiStepperProvider";
export default function ChooseRouteModal({ props }) {
  const { isOpen, setIsOpen } = props;
  const { setValue, value, dispatch } = useMultiForm()
  const [routeType, setRouteType] = React.useState(value.details.route?.type || 'out');
  const { data: routes, loading } = useDataFetcher(`/route?transportation_type=${routeType}`);
  const intialRouteValue = { id: null, description: null, type: null }
  const [selectedRoute, setSelectedRoute] = React.useState(value.details.route || intialRouteValue);
  const handleClose = () => {
    setIsOpen(false);
    setSelectedRoute(intialRouteValue);
  };
  React.useEffect(() => {
    if (isOpen && !selectedRoute.id && value.details.route?.id) {
      setSelectedRoute(value.details.route);  // If modal opens, preserve the previously selected route.
    }
  }, [isOpen, value.details.route, selectedRoute.id]);
  return (
    <React.Fragment>
      <div className={`fixed h-screen w-full bg-gray-500 bg-opacity-75 top-0 z-10 left-0  ${ isOpen ? "block" : "hidden"}`}>
        <div className="absolute left-1/2 -translate-x-1/2 animate-modalDrop">
          <div className="relative z-20 px-8 py-7 w-[550px] bg-white shadow-md rounded-md ">
            <Typography variant="subheading1">Select Route</Typography>
            <Typography variant="info" className={`mt-1 mb-5`}> Choose your desired route for this journey </Typography>
            <button type="button" className={`absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full`} onClick={handleClose}> <RxCross2 size={20} /> </button>
            <Typography variant="subheading2" className={`pt-5 `}>
              Choose Route Type
            </Typography>
            <div className="flex gap-3 mt-2">
              <Button
                variant="border"
                type="button"
                className={`grow h-12 transition-colors duration-300 hover:shadow-md ${isActive(
                  routeType,
                  "out"
                )}`}
                onClick={() => setRouteType("out")}>
                OUT
              </Button>
              <Button
                variant="border"
                type="button"
                className={`grow h-12 transition-colors duration-300 hover:shadow-md ${isActive(
                  routeType,
                  "in"
                )}`}
                onClick={() => setRouteType("in")}>
                IN
              </Button>
            </div>
            <Typography variant="subheading2" className={`mt-5`}>
              Available Routes
            </Typography>
            {loading ? <MiniLoader className={`min-h-48`}/> :
            <ShipRoutes props={{ routes, selectedRoute, setSelectedRoute, value }} />
            }
            <div className="mt-5 border-t-2 border-dotted pt-5">
              <Button type="button" className={`w-full`}
                onClick={() => {
                  if (selectedRoute.id !== value.data?.route_id) {
                    setValue((prevState) => ({
                        ...prevState,
                        data: { ...prevState.data, route_id: selectedRoute.id },
                        details: { ...prevState.details, route: selectedRoute },
                    }));
                  }
                  setIsOpen(false);
                  value.data?.vessel_id ? dispatch({ type: "NEXT" }) : null ;

                }}
                disabled={selectedRoute.id || value.data?.route_id ? false : true}>
                Confirm
              </Button>
              <Button variant="border" type="button" className={`w-full mt-2`} onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
