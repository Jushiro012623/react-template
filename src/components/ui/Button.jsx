import clsx from 'clsx';
import React, { useRef } from 'react';

const variants = {
  primary: 'text-white border bg-slate-800 hover:bg-slate-900',
  secondary: 'bg-gray-300 text-black border-gray-300 hover:bg-gray-400',
  danger: 'bg-red-500 text-white border-transparent hover:bg-red-600',
  light: 'bg-white border text-slate-900 hover:bg-gray-100',
  dark: 'bg-slate-700 text-white border-transparent hover:bg-slate-800',
  border: 'bg-border border text-slate-900',
};

const sizes = {
  small: 'py-[10px] px-3 text-xs',
  small2: 'py-3 px-4 text-xs',
  medium: 'py-3 px-4 text-sm',
  large: 'py-4 px-5 text-lg',
};
export default function Button({ onClick, className, children, variant = 'primary', size = 'small', ...props }) {
  const buttonRef = useRef(null);
  // const handleClick = (e) => {
  //   const ripple = document.createElement('span');
  //   ripple.classList.add('ripple');
  //   const x = e.clientX - buttonRef.current.offsetLeft;
  //   const y = e.clientY - buttonRef.current.offsetTop;
  //   ripple.style.left = `${x}px`;
  //   ripple.style.top = `${y}px`;
  //   buttonRef.current.appendChild(ripple);
  //   setTimeout(() => {
  //     ripple.remove();
  //   }, 500);
  // };
  return (
    <button
      ref={buttonRef}
      className={clsx(
        'relative overflow-hidden border outline-none rounded-md focus:outline-none btn min-w-20',
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
