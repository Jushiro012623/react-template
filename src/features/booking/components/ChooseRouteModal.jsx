import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import useDataFetcher from '@/hooks/useDataFetcher';
import { MultiStepper } from '@/pages/TripBooking';
import { isActive } from '@/utils/tripBookingUtils';
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import ShipRoutes from './ShipRoutes';
export default function ChooseRouteModal({props}) {

    const { isOpen, setIsOpen} = props
    const { setValue, value } = React.useContext(MultiStepper)
    // const [isOpen, setIsOpen] = React.useState()
    const [routeType, setRouteType] = React.useState('out')
    const { data: routes, loading, error } = useDataFetcher(`route?transportation_type=${routeType}`)

    const rideOptions = [
        {id: 1, name: 'Passenger'},
        {id: 2, name: 'Rolling Cargo'},
        {id: 3, name: 'Drop Caro'},
    ]
    const [selectedRoute, setSelectedRoute] = React.useState({
        id: null,
        description: null,
        type: null
    })
    const handleClose = () => {
        setIsOpen(false);
        // setValue(prevState => ({ ...prevState, route : null} ))
    }
    return (
        <React.Fragment>
            <div className={`fixed h-screen w-full bg-gray-500 bg-opacity-75 top-0 z-10 left-0  ${isOpen ? "block" : 'hidden'}`}>
                <div className='absolute left-1/2 -translate-x-1/2 animate-modalDrop'>
                    <div className='relative z-20 px-8 py-7 w-[550px] bg-white shadow-md rounded-md '>
                        <Typography variant='subheading1' >Select Route</Typography>
                        <Typography variant='info' className={`mt-1 mb-5`}>Choose your desired route for this journey</Typography>
                        <button type="button" className={`absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full`} onClick={handleClose}><RxCross2 size={20} /></button>
                        <Typography variant='subheading2' className={`pt-5 `}>Choose Route Type</Typography>
                        <div className='flex gap-3 mt-2'>
                            <Button variant="border" type="button" className={`grow h-12 transition-colors duration-300 ${isActive(routeType, 'out')}`} onClick={() => setRouteType('out')}>OUT</Button>
                            <Button variant="border" type="button" className={`grow h-12 transition-colors duration-300 ${isActive(routeType, 'in')}`} onClick={() => setRouteType('in')}>IN</Button>
                        </div>
                        <Typography variant='subheading2' className={`mt-5`}>Available Routes</Typography>
                        <ShipRoutes props={{routes, selectedRoute, setSelectedRoute}}/>
                        <div className='mt-5 border-t-2 border-dotted pt-5'>
                            <Button type="button" className={`w-full`} onClick={() => { setValue(prevState => ({ ...prevState, route: selectedRoute })); setIsOpen(false); }} disabled={selectedRoute.id === null ? true : false}>Confirm</Button>
                            <Button variant="border" type="button" className={`w-full mt-2`} onClick={handleClose}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Button type="button" className="border h-10 w-full" onClick={() => setIsOpen(true)}>Select Route</Button> */}
        </React.Fragment>
    )
}
