import React from 'react';
import axios from 'axios';

// const API = process.env.APP || `http://127.0.0.1:8080/api`

export default async function  useSubmitData(endpoint, data, headers = {}, method = 'POST') {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
    try {
        const res = await axios({
            method,
            url,
            data,
            headers,
        });
        setResponse(res.data);
    } catch (err) {
        setError(err.response ? err.response.data : { message: "Network Error" });
    } 
    finally {
        setLoading(false);
    }
    return { error, loading, response };
}
