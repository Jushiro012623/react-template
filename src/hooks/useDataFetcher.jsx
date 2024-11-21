import { useAuth } from '@/context/AuthProvider';
import axios from 'axios'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const baseUrl = process.env.APP || `http://127.0.0.1:8080/api/`
const useDataFetcher = (endpoint,params = null,headers={}, method="GET") => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { logout } = useAuth()
    React.useEffect(() => {
        axios({
            method,
            url: `${baseUrl}${endpoint}`,
            params,
            headers
        })
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
        
    //         // const source = axios.CancelToken.source();
    //         const fetchThisData = async () =>{
                // try { 
                //     const response = await axios({
                //         method,
                //         url: `${baseUrl}${endpoint}`,
                //         params,
                //         headers
                //     })
                //     response && setData(response.data.data);
                // } catch (error) {
                //     setError(error)
                //     if(error?.status == 401){
                //         logout()                    
                //     }
                    
                // } finally{
                //     setLoading(false)
                // }
            // }
            // fetchThisData();
            // return () => {
            //     source.cancel();
            // }
    }, [endpoint])
    return { data, loading, error }
}
export default useDataFetcher
