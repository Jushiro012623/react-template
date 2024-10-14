import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import useDataFetcher from '@/hooks/useDataFetcher';
import { MultiStepper } from '@/pages/TripBooking';
import { isActive } from '@/utils/tripBookingUtils';
import React from 'react'
import { RxCross2 } from "react-icons/rx";
export default function ChooseRouteModal() {

    const { setValue, value } = React.useContext(MultiStepper)
    const [isOpen, setIsOpen] = React.useState()
    const [routeType, setRouteType] = React.useState('out')
    const { data:routes, loading, error } = useDataFetcher(`route?transportation_type=${routeType}`)

    const [selectedRoute, setSelectedRoute] = React.useState({
        id: null,
        description: null,
        type: null
    })
    const handleClose = () =>{
        setIsOpen(false);
        // setValue(prevState => ({ ...prevState, route : null} ))
    }
    // console.log(selectedRoute);
    
    return (
    <React.Fragment>
        <div className={`fixed h-screen w-full bg-slate-900/20 top-0 z-10 left-0 ${isOpen ? "block" : 'hidden'}`}>
            <div className='absolute left-1/2 -translate-x-1/2 animate-modalDrop'>
                <div className='relative z-20 px-8 py-10 w-[550px] bg-white shadow-md rounded-md '>
                    <Typography variant='subheading1' >Select Route</Typography>
                    <Typography variant='info' className={`mt-1`}>Lorem ipsum dolor sit amet.</Typography>
                    <button type="button" className={`absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full`}  onClick={handleClose}><RxCross2 size={20}/></button>
                    <Typography variant='subheading2' className={`mt-10`}>Choose Route Type</Typography>
                    <div className='flex gap-3 mt-2'>
                        <Button variant="border" type="button" className={`grow ${isActive(routeType, 'out')}`} onClick={()=>setRouteType('out')}>OUT</Button>
                        <Button variant="border" type="button" className={`grow ${isActive(routeType, 'in')}`} onClick={()=>setRouteType('in')}>IN</Button>
                    </div>
                    <Typography variant='subheading2' className={`mt-5`}>Available Routes</Typography>
                    {routes ? (routes.map((route)=>(
                        <div key={route.id} className={`border h-12 px-5 mt-3 rounded-md cursor-pointer flex items-center gap-10 animate-appear duration-500 ${isActive(selectedRoute.id, route.id)}`} 
                            onClick={() => setSelectedRoute({ 
                                id: route.id, 
                                description: `${route.routes.origin} - ${route.routes.destination}` ,
                                type: route.transportationType
                        })}
                        >
                            <Typography variant='small' className={` capitalize ${route.transportationType === 'out' ? 'text-red-400' : 'text-teal-400'} `}>{route.transportationType}</Typography>
                            <Typography variant='small'>{route.routes.origin} - {route.routes.destination}</Typography>
                        </div>
                    ))) : null}
                    <Button type="button" className={`w-full mt-5`} onClick={()=>{setValue(prevState => ({ ...prevState, route: selectedRoute} )); setIsOpen(false) }} disabled={selectedRoute.id === null ? true : false}>Confirm</Button>
                    <Button variant="border" type="button" className={`w-full mt-2`} onClick={handleClose}>Cancel</Button>
                </div>
            </div>
        </div>
        <Button type="button" className="border h-10 w-full" onClick={()=>setIsOpen(true)}>Select Route</Button>
    </React.Fragment>
  )
}
