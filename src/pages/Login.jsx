import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import MiddleInput from "@/components/ui/MiddleInput";
import { CombinationLogo } from "@/components/ui/Logo";
import { LuUser2, LuLock } from "react-icons/lu";
import { AiOutlineLoading } from "react-icons/ai";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useAuth } from "@/context/AuthProvider";
import loginSVG from '../assets/logistics.svg'
import api from "../api/api"
export default function Login() {
    useDocumentTitle("GT | Login");
  const [loading, setLoading] = React.useState(false);
  const { token, login } = useAuth();
  const [inputError, setInputError] = React.useState();
  const [input, setInput] = React.useState({});
  const handleChange = (field, value) => {
    setInput((prevState) => ({ ...prevState, [field]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await api.post('/login', input)
        const data = response.data.data
        login(data)
    }catch (error) {
        setInputError(error.response?.data.errors || error.response?.data);
    }finally {
        setLoading(false);
    }
  };
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <React.Fragment>
        {/* <img src={loginBG} className="fixed  w-screen top-0 left-0 opacity-30"/> */}
        <section className="relative w-full h-screen py-[120px] px-[5%]">
            {/* <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex gap-5  items-center justify-center"> */}
                <form className="absolute top-1/2 -translate-y-1/2 left-96 bg-white shadow-xl flex border  rounded-3xl px-10 py-14 min-w-[500px] mx-auto flex-col z-10"
                    onSubmit={handleSubmit} >
                    <CombinationLogo className={`mx-auto h-8`} />
                    <MiddleInput
                    variant={`${inputError?.email || inputError?.message ? "danger" : "default"}`}
                    name="email"
                    placeholder="Email Address"
                    className={`w-full`}
                    parentClass={` mt-10`}
                    icon={<LuUser2 className="text-gray-500" />}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={`${inputError?.email || inputError?.message || ""}`}
                    />
                    <MiddleInput
                    variant={`${inputError?.password || inputError?.message ? "danger" : "default"}`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`w-full`}
                    parentClass="mt-5"
                    icon={<LuLock className="text-gray-500" />}
                    error={`${inputError?.password || inputError?.message || ""}`}
                    onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <Typography variant="small" className={`text-right mt-2`}>
                    Forgot Password?
                    </Typography>
                    <Button
                    size="small2"
                    type="submit"
                    className="mt-2 flex items-center justify-center">
                    {loading ? (
                        <AiOutlineLoading
                        color="#ffffff"
                        className="text-base animate-loadingCircle"
                        />
                    ) : (
                        "Login"
                    )}
                    </Button>
                    <Typography
                    variant="small"
                    className={`text-center mt-6 relative after:absolute  after:w-[38%] after:h-[.5px] after:bg-gray-300 after:left-0 after:top-1/2 after:-translate-y-1/2  before:absolute  before:w-[38%] before:h-[.5px] before:bg-gray-300 before:right-0 before:top-1/2 before:-translate-y-1/2`}>
                    No Account
                    </Typography>
                    <Link
                    className="mt-6 bg-border border text-slate-900 py-3 px-4 text-xs text-center"
                    to={"/register"}>
                    Create Account
                    </Link>
                </form>
                <img src={loginSVG} alt="" className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[850px] -translate-x-10"/>
            {/* </div> */}
        </section>
    </React.Fragment>
  );
}
