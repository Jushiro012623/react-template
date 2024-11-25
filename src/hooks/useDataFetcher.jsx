import api from '@/api/api';
import { useAuth } from '@/context/AuthProvider';
import axios from 'axios'
import React from 'react'

// const baseUrl =  || `http://127.0.0.1:8080/api`

const useDataFetcher = (endpoint, params = null) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { logout, token } = useAuth()
    React.useEffect(() => {
        api.get(endpoint, params,token)
        .then((response) => {
            response && setData(response.data.data);
        }).catch((error) => {
            setError(error)
            if(error?.status == 401){
                logout()                 
            }
        }).finally(() => {
            setLoading(false)
        });
    }, [endpoint])
    return { data, loading, error }
}
export default useDataFetcher
