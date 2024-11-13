import axios from "axios";
import React, { useContext, createContext, useState } from "react";
import { useCookies } from "react-cookie";
const AuthContext = createContext();
const APP = process.env.APP || "http://127.0.0.1:8080/api"
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const token = cookies.token || "";
  React.useEffect(()=>{
    const fetchUser = async () => {
      if(!user && token){
       await useGetUser(token)
      }else if (!token){
        localStorage.removeItem("name");
        localStorage.removeItem("email");
      }
    }
    fetchUser()
  },[token, user])

  const useGetUser = async (_token) => {
	await axios(`${APP}/user`, {
		method: "GET",
		headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${_token}`,
		},
	}).then((res) => {
		const user = res.data
		setUser(user);
		localStorage.setItem("name",user.name);
		localStorage.setItem("email",user.email);
		// sessionStorage.setItem("name",user.name);
		// sessionStorage.setItem("email",user.email);
	}).catch((err) => {
		throw err;
	})
  }
  const loginAction = async (data) => {
      await axios(`${APP}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      }).then(async (res) => {
        const _token =  res.data.data.token
		useGetUser(_token)
		// await axios(`${APP}/user`, {
		// 	method: "GET",
		// 	headers: {
		// 			"Content-Type": "application/json",
		// 			'Authorization': `Bearer ${_token}`,
		// 	},
		// }).then((res) => {
		// 	const user = res.data
		// 	setUser(user);
		// 	localStorage.setItem("name",user.name);
		// 	localStorage.setItem("email",user.email);
		// }).catch((err) => {
		// 	throw err;
		// })
        setCookie("token", await _token, { path: '/' })
      }).catch((err) => {
		removeCookie("token");
        throw err;
      })
  };
  const logOut = () => {
    setUser(null);
    removeCookie("token")
    // setToken("");
    // localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};