import React, { useContext, createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [token, setToken] = useState(cookies.token);
    // const navigate = useNavigate(); // useNavigate hook
    // const token = cookies.token || "";
    // React.useEffect(()=>{
    //     const fetchUser = async () => {
    //     if(!user && token){
    //     }else if (!token){
    //         localStorage.removeItem("name");
    //         localStorage.removeItem("email");
    //     }
    //     }
    //     fetchUser()
    // },[token, user])

    const login = (access_token) => {
        setToken(access_token)
        setCookie("token", access_token, { path: '/'})
    };

    const logout = () => {
        setUser(null);
        removeCookie("token")
        // navigate('/')
        return <Navigate to="/login" />
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};