import { useAuth } from '@/context/AuthProvider';
import axios from 'axios';
import React from 'react'
const APP = process.env.APP || `http://127.0.0.1:8080/api`
export default function useGetUser() {
    const auth = useAuth()
    const [user, setUser] = React.useState()
    React.useEffect(()=>{
      const getUser = async () => {
            await axios(`${APP}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${auth.token}`,
            },
            }).then((res) => {
                console.log(res.data);
                setUser( res.data);
            }).catch((err) => {
                throw err;
            })
        };
        getUser();
    },[])
    return {user}
}

