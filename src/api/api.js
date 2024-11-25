import axios from "axios";
// import config from "../../config";
// const BASE_URL = config.api_url;
const BASE_URL = import.meta.env.VITE_API_DEV_URL;
// const BASE_URL = "https://staging-api-eticket.pisopay.com.ph/api";

const api = axios.create({
  baseURL: BASE_URL,
});

const refreshToken = async () => {
  try {
    const resp = await api.get("/v1/auth/refresh");
    console.log("refresh token", resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("_accessToken");
    if (token) {
      config.headers["Authorization"] = ` bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const resp = await refreshToken();
      const access_token = resp.response.access_token;
      console.log(access_token);

      localStorage.setItem("token", access_token);
      customFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return customFetch(originalRequest);
    }
    return Promise.reject(error);
  }
);

export async function get(route, params, token = null) {
//   const token = localStorage.getItem("_accessToken");
  let response = null;

  if (token) {
    response = await axios.get(BASE_URL + route, {
      params,
      headers: { Authorization: "Bearer " + token },
    });
  } else {
    response = await axios.get(BASE_URL + route, {
      params,
    });
  }

  return response;
}

export async function post(route, body, token = null) {
//   const token = localStorage.getItem("_accessToken");
  let response = null;

  if (token) {
    response = await axios.post(BASE_URL + route, body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    response = await axios.post(BASE_URL + route, body);
  }
  return response;
}

export async function put(route, body) {
  const token = localStorage.getItem("_accessToken");
  let response = null;
  response = await axios.put(BASE_URL + route, body, {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
}

export async function destroy(route, params) {
  const token = localStorage.getItem("_accessToken");
  let response = null;
  response = await axios.delete(BASE_URL + route, {
    headers: { Authorization: "Bearer " + token },
    params: params,
  });
  return response;
}

export async function upload(route, body) {
  const token = localStorage.getItem("_accessToken");
  let response = null;

  response = await axios.post(BASE_URL + route, body, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function download(route, params) {
  const token = localStorage.getItem("_accessToken");
  let response = null;

  if (token) {
    response = await axios.get(BASE_URL + route, {
      params,
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "blob",
      },
    });
  } else {
    response = await axios.get(BASE_URL + route, {
      params,
    });
  }

  return response;
}

export default {
  refreshToken,
  get,
  post,
  put,
  destroy,
  upload,
  download,
};
