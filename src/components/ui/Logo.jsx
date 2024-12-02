import React from "react";
import logo from "/logo.svg";
export function CombinationLogo({className = 'h-6 '}) {
  return (
    <div className={`flex items-center ${className}`}>
        <img src={logo} className={`h-full`} alt="logo" />
    </div>
  );
}

