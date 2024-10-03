import React from "react";
import { CombinationLogo } from "../components/core/Logo";
export default function Navbar() {
  return (
    <nav className="w-full flex h-20 items-center px-16 justify-between bg-white border-b">
        <CombinationLogo />
    </nav>
  );
}
