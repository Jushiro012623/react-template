import React from "react";
import clsx from "clsx";
import Typography from "./Typography";

export const variants = {
  default:
    "border border-slate-300  bg-transparent focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900",
  danger:
    "border border-red-500 bg-transparent focus:ring-1 focus:ring-red-400 text-slate-900",
};
export default function MiddleInput({parentClass, icon, name, variant = "default", className, error, ...props}) {
    const variantClass = variants[variant] || variants.default;
    return (
      <>
        <div className={`relative ${parentClass}`} >
        <i className="absolute top-1/2 left-4 -translate-y-1/2">{icon || null}</i>
        <input
          name={name}
          className={clsx(
            "rounded-md h-11 text-xs outline-none px-4 text-center",
            variantClass,
            className
          )}
          {...props}
          />
        { error && 
        <Typography color="danger" className={`absolute bottom-0 left-0 translate-y-full`} variant="info">{error}</Typography>
        }
        </div>
      </>
    );
}

