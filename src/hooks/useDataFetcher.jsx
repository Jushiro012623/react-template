import axios from 'axios'
import React from 'react'
const baseUrl = process.env.APP || `http://127.0.0.1:8080/api/`
const useDataFetcher = (endpoint,params = null,headers={}, method="GET") => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
            // const source = axios.CancelToken.source();
            const fetchThisData = async () =>{
                try { 
                    const response = await axios({
                        method,
                        url: `${baseUrl}${endpoint}`,
                        params,
                        headers
                    })
                    response && setData(response.data.data);
                } catch (error) {
                    setError(error)
                } finally{
                    setLoading(false)
                }
            }
            fetchThisData();
            // return () => {
            //     source.cancel();
            // }
    }, [endpoint])
    return { data, loading, error }
}
export default useDataFetcher
