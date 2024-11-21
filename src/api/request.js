import { useAuth } from "@/context/AuthProvider";
import React from "react";

const APP = process.env.APP || "http://127.0.0.1:8080/api"
// const { token } = useAuth()
const api = {};
api.post = async ({url, data, auth = false}) =>{
    React.useEffect(() => {

        const { token } = useAuth()
        // try {
        axios(`${APP}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            ...(auth === true ? {"Authorization": `Bearer ${token}`} : {})
            },
            data: JSON.stringify(data)
        }).then((response)=>{return response.data})
        .catch((error) =>{throw error })
        
    // } catch (error) {
        
    // }
},[])
}

api.get = async (url, auth) => {
    const { token } = useAuth()
    try {
        const response = await axios(`${APP}/${url}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            ...(auth === true ? {"Authorization": `Bearer ${token}`} : {})
            },
            // data: JSON.stringify(data)
        })
        return response.data
    } catch (error) {
        throw error 
    }
}


// axios(`${APP}/login`, {
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json",
//     },
//     data: JSON.stringify(data)
// })
// .then((res) => { return res.data.data.access_token } )
// .catch((error) => { throw error } )

export default api