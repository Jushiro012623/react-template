import React from "react";
import { CombinationLogo } from "./ui/Logo";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/context/AuthProvider";
export default function Navbar() {
    const {logout} = useAuth()
 const handleLogout = () => {
        logout()
        window.location.reload();
 }
  return (
    <nav className="z-10 fixed top-0 left-0 w-full flex h-20 items-center px-16 justify-between bg-white border-b">
        <CombinationLogo />
        <button onClick={handleLogout}><CiLogout size={20} /></button>
    </nav>
  );
}
