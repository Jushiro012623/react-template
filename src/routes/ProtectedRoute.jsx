import { useAuth } from "@/context/AuthProvider";
import Login from "@/pages/Login";
import axios from "axios";
import {jwtDecode} from "jwt-decode";  // Ensure proper import for jwt-decode
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom"; 

const ProtectedRoute = ({ element }) => {
    const { token } = useAuth(); // Get token from context (setToken for logout)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    // useEffect(() => {
    //     // Check if the token is available
    //     if (!token) {
    //         removeCookie("token");
    //         return <Navigate to="/login" />;
    //     }

    //     // Decode the token and check expiration
    //     try {
    //         const decodedToken = jwtDecode(token);
    //         const currentTime = Date.now() / 1000;  // Current timestamp in seconds

    //         // If the token is expired, remove it from cookies and context
    //         if (decodedToken.exp < currentTime) {
    //             removeCookie("token");
    //             setToken(null);  // Clear the token from context as well
    //             return <Navigate to="/login" />;
    //         }

    //         // If the token is valid, make the API request to check user validity
    //         axios.get('http://127.0.0.1:8080/api/user', {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'Authorization': `Bearer ${token}`,
    //             }
    //         })
    //         .then((response) => {
    //             console.log(response.data);  // Do something with user data if needed
    //         })
    //         .catch((error) => {
    //             console.error("API error:", error);
    //             removeCookie("token");
    //             return <Navigate to="/login" />;
    //         });
    //     } catch (error) {
    //         console.error("Token decode error:", error);
    //         removeCookie("token");
    //         setToken(null);  // Clear the token from context
    //         return <Navigate to="/login" />;
    //     }
    // }, [token, removeCookie, setToken]);

    // // If token exists and is valid, render the protected route
    // if (token) {
    //     return element;
    // }

    // // Fallback to Login if no valid token exists
    // return <Navigate to="/login" />;
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
