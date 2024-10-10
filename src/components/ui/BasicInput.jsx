import React from "react";
import clsx from "clsx";

export const variants = {
  default:
    "border border-slate-300  bg-transparent focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900",
  danger:
    "border border-red-500 bg-transparent focus:ring-1 focus:ring-red-400 text-slate-900",
};
export function BasicInput({ name, variant = "default", className, ...props}) {
    const variantClass = variants[variant] || variants.default;
    return (
      <input
        name={name}
        className={clsx(
          "rounded-md h-11 text-xs outline-none px-4",
          variantClass,
          className
        )}
        {...props}
      />
    );
}

