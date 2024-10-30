import React from 'react';
import axios from "axios";
const API = "http://127.0.0.1:8080/api";

export default function useSubmitData() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    /**
     * @param {string} endpoint post endpoint
     * @param {Object} data payload
     * @param {Object|null} headers headers
     **/
    const submitData = async (endpoint, data, headers = {}) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${API}/${endpoint}`;
            const res = await axios.post(url, data, { headers });
            setResponse(res.data); // Store the response data
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { submitData, error, loading, response };
}