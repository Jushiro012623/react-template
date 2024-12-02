import React, { useContext, createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
    });
    const [cookies, setCookie, removeCookie] = useCookies(['_accessToken']);
    const [token, setToken] = useState(cookies._accessToken);
    
    const memoizedToken = React.useMemo(() => token, [token]);
    
    const login = (response) => {
        setToken(response.access_token)
        setCookie("_accessToken", response.access_token, { path: '/'})
        localStorage.setItem('name', response.user.name)
        localStorage.setItem('email', response.user.email)
    };

    const logout = () => {
        setUser(null);
        removeCookie("_accessToken")
        // navigate('/')
    };

    return (
        <AuthContext.Provider value={{ token:memoizedToken, user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};