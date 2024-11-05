
import axios from "axios";
import { useContext, createContext, useState } from "react";
import { useCookies } from "react-cookie";
const AuthContext = createContext();
const APP = "http://127.0.0.1:8080/api"
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const token = cookies.token || "";
  const loginAction = async (data) => {
      await axios(`${APP}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      }).then((res) => {
        // setToken(res.data.data.token);
        setCookie("token", res.data.data.token, { path: '/' })
        localStorage.setItem("token",res.data.data.token);
        return res.data.data.token;
      }).catch((err) => {
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