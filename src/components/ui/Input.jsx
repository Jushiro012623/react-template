import React, { useRef, useState } from "react";
import Typography, { colors } from "./Typography";
import clsx from "clsx";

const variants = {
  default:
    "border bg-transparent focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900",
  danger:
    "border border-red-400 bg-transparent focus:ring-1 focus:ring-red-400 text-slate-900",
};
export function LabeledInput({
  variant = "default",
  name,
  label,
  message,
  className,
  ...props
}) {
  const variantClass = variants[variant] || variants.default;
  return (
    <div>
      <Typography
        htmlFor={name}
        variant="label"
        color={variant}
        className={`mt-1 block`}>
        {label}
      </Typography>
      <input
        name={name}
        className={clsx(
          "rounded-md h-11 text-xs outline-none px-4",
          variantClass,
          className
        )}
        placeholder={label}
        {...props}
      />
      <Typography variant="info" color={variant} className={`mt-1`}>
        {message}
      </Typography>
    </div>
  );
}

export function Input({
  variant = "default",
  name,
  label,
  className,
  message,
  ...props
}) {
  const variantClass = variants[variant] || variants.default;
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const ref = useRef();
  const handleFocus = () => {
    setIsFocused(true);
    ref.current.focus();
  };
  const handleBlur = (e) => {
    setIsFocused(false);
    setIsValid(!!e.target.value); // Check if the input has a value
  };
  return (
    <div className="relative">
      <Typography
        htmlFor={name}
        variant="label"
        color={variant}
        className={clsx(
          "absolute px-1 transition-all duration-300 bg-bg",
          isFocused || isValid
            ? `top-0  ml-2 text-[11px] transform -translate-y-1/2`
            : "top-1/2  ml-4 -translate-y-1/2"
        )}
        onClick={handleFocus}>
        {label}
      </Typography>
      <input
        ref={ref}
        name={name}
        className={clsx(
          "rounded-md h-11 text-xs outline-none px-4 z-10",
          variantClass,
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setIsValid(!!e.target.value)}
        {...props}
      />
      <Typography
        variant="info"
        color={variant}
        className={`absolute bottom-0 translate-y-5 mt-1`}>
        {message}
      </Typography>
    </div>
  );
}

export function DefaultInput({
  name,
  variant = "default",
  className,
  ...props
}) {
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

