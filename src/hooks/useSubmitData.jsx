import React from 'react';
import axios from 'axios';

const API = "http://127.0.0.1:8080/api";

export default function useSubmitData() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);

    const submitData = async (endpoint, data, headers = {}, method = 'POST') => {
        setLoading(true);
        setError(null);
        const url = `${API}/${endpoint}`;
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
        } finally {
            setLoading(false);
        }
    };
    return { submitData, error, loading, response };
}
