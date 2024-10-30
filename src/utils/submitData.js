import axios from "axios";
const API = "http://127.0.0.1:8080/api";

/**
 * @param {string} endpoint
 * @param {array|Object} data
 * @param {array|Object} customHeaders
 * */
export const submitData = async (endpoint, data = '', customHeaders = null) => {
  return await axios.post(
    `${API}/${endpoint}`,
      data,
    {
      headers: {
        "Content-Type": "application/json",
        customHeaders
      },
    }
  ).then((res) =>{
    console.log(res); 
  }
  ).catch((err) => {
    console.error(err);
  })
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
