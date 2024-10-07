import React from "react";
import logo from "@/assets/logo.svg";
export function CombinationLogo({className}) {
  return (
    <div className={`flex items-center ${className}`}>
        <img src={logo} className={`h-6 `} alt="logo" />
    </div>
  );
}

