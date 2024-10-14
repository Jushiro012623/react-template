import React from "react";
import { CombinationLogo } from "./ui/Logo";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex h-20 items-center px-16 justify-between bg-white border-b">
        <CombinationLogo />
    </nav>
  );
}
