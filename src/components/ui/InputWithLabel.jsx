import React from 'react'
import { variants } from './BasicInput';
import clsx from 'clsx';
import Typography from './Typography';
export default function InputWithLabel({

    variant = "default",
    name,
    label,
    message,
    className,
    onChange = () => {},
    value = '',
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
          onChange={onChange}
          // value={value}
          {...props}
        />
        <Typography variant="info" color={variant} className={`mt-1`}>
          {message}
        </Typography>
      </div>
    );
  }
