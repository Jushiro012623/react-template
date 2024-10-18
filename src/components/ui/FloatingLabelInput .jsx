import React from 'react'
import { variants } from './BasicInput';
import Typography from './Typography';
import clsx from 'clsx';
export default function FloatingLabelInput({ variant = "default", name, label, className, parentClass, message, onChange,...props
}) {
  const variantClass = variants[variant] || variants.default;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const ref = React.useRef();
  const handleFocus = () => { setIsFocused(true); ref.current.focus(); };
  const handleBlur = (e) => { setIsFocused(false); setIsValid(!!e.target.value);}; // Check if the input has a value 
  return (
    <div className={`${parentClass} relative`}>
        <Typography
            htmlFor={name}
            variant="label"
            color={variant}
            className={clsx( "absolute px-1 transition-all duration-300 bg-white",
                isFocused || isValid
                ? `top-0  ml-2 text-[11px] transform -translate-y-1/2`
                : "top-1/2 text-slate-500 ml-4 -translate-y-1/2  cursor-text"
            )} 
            onClick={handleFocus}
        >
            {label}
        </Typography>
        <input
            ref={ref}
            name={name}
            className={clsx("rounded-md w-full h-11 text-xs outline-none px-4 z-10", variantClass, className )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {setIsValid(!!e.target.value); onChange}}
            {...props}
        />
        <Typography variant="info" color={variant} className={`absolute bottom-0 translate-y-5 mt-1`}>
            {message}
        </Typography>
    </div>
  );
}
