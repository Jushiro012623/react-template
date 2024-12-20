import axios from "axios";
import { config } from "dotenv";

// const BASE_URL = 
const BASE_URL = import.meta.env.VITE_API_DEV_URL;;
// import dotenv from 'dotenv';
// dotenv.config()
/**
 * @param {string} endpoint
 * @param {array|Object} data
 * @param {array|Object} customHeaders
 * */

// const API = process.env.APP || `http://127.0.0.1:8080/api`
export const submitData = async (url,data,headers, method = 'POST') => {
    return await axios({
        method,
        url: `${BASE_URL}/${url}`,
        data,
        headers,
    });
};

