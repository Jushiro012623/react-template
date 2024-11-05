import Loader from '@/components/Loader'
import { useAuth } from '@/context/AuthProvider'
import useDataFetcher from '@/hooks/useDataFetcher'
import React from 'react'
export default function ViewTicket() {
    
    const user = useAuth()
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
    }
    const { data, loading, error } = useDataFetcher('ticket', null, headers)
  return (
    <React.Fragment>
    {!data ? <div className='min-h-screen w-full flex items-center justify-center'>Loading</div> :
        <div className='w-full mt-20'>
            {data.map((ticket)=>{
                return (
                    <div key={ticket.id} className='w-96 border'>
                        <h2>{ticket.vessel_type}</h2>
                        <p>{ticket.transaction_status}</p>
                    </div>
                )
            })}
        </div>}
    </React.Fragment>
    
  )
}
