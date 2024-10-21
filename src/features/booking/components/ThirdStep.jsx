import Typography from '@/components/ui/Typography'
import useDataFetcher from '@/hooks/useDataFetcher'
import { MultiStepper } from '@/pages/TripBooking'
import React from 'react'

export default function ThirdStep() {
    const {setValue, value} = React.useContext(MultiStepper)
    const params = {
        route_id: value.route.id,
        type_id:value.option,
        weight:value.details.rolling_weight || value.details.drop_weight || null,
        discount:value.details.discount || null,
    }
    const { data, loading, error } = useDataFetcher('ticket/review', params)
    // React.useEffect(() =>{
    //     console.log(data);  
    //     console.log(value);
        
    // },[])
  return (
    <React.Fragment>
    {loading ? 
        <Typography>Loading</Typography> : 
        <React.Fragment>
            <Typography>{data.base_fare}</Typography>
            <Typography>{data.discount || ''}</Typography>
            <Typography>{data.additional_fee || ''}</Typography>
            <Typography>{data.discounted_fare}</Typography>
            <Typography>{data.total_amount}</Typography>
            <Typography>{value.vessel.name}</Typography>
            <Typography>{value.route.destination}</Typography>
            <Typography>{value.route.origin}</Typography>
            <Typography>{value.route.type}</Typography>
            <Typography>Name</Typography>
            <Typography>Email</Typography>
            <Typography>{value.option === 1 ? 'Passenger' : (value.option === 2 ? 'Rolling Cargo' : 'Drop Cargo')}</Typography>
        </React.Fragment>
    }
    </React.Fragment>
  )
}
