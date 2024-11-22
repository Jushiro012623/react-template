import axios from "axios";
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
        url: `${import.meta.env.VITE_API_URL}/${url}`,
        data,
        headers,
    });
};

// export const submitDataV2 = new Promise((resolve, reject) =>{
//   axios.post(`${API}/ticket/booking`, data, {
//     headers: {
//       "Content-Type": "application/json",
//       customHeaders
//     },
//   })
//    .then((res) => resolve(res))
//    .catch((err) => reject(err));
// })
// submitDataV2.then(
//   // function(value) {myDisplayer(value);},
//   // function(error) {myDisplayer(error);}
// );
