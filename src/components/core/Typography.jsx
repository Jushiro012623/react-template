import clsx from "clsx";
import React from "react";

const variants = {
  h1: {
    type: "h1",
    class: "text-4xl font-bold",
  },
  h2: {
    type: "h2",
    class: "text-3xl font-semibold",
  },
  h3: {
    type: "h3",
    class: "text-2xl font-medium",
  },
  h4: {
    type: "h4",
    class: "text-xl font-normal",
  },
  h5: {
    type: "h5",
    class: "text-lg font-normal",
  },
  h6: {
    type: "h6",
    class: "text-base font-normal",
  },
  subheading1: {
    type: "h6",
    class: "text-base font-semibold",
  },
  subheading2: {
    type: "h6",
    class: "text-sm font-medium",
  },
  body1: {
    type: "p",
    class: "text-base",
  },
  body2: {
    type: "p",
    class: "text-sm",
  },
  info: {
    type: "p",
    class: "text-[11px]",
  },
  p: "p",
  label: {
    type: "label",
    class: "text-xs",
  },
};
export const colors = {
  default: "text-slate-900", // Dark gray for default text
  primary: "text-blue-500", // Primary color for accents and links
  secondary: "text-green-500", // Secondary color for accents
  danger: "text-red-500", // Red for error messages
  warning: "text-yellow-500", // Yellow for warnings
  info: "text-teal-500", // Teal for informational text
  light: "text-gray-400", // Light gray for less prominent text
  dark: "text-gray-800", // Dark gray for headings or emphasis
};

export default function Typography({
  variant = "body1",
  color = "default",
  children,
  className,
  ...props
}) {
  const variantConfig = variants[variant] || variants.body1;
  const Component = variantConfig.type;

  return (
    <Component
      className={clsx(colors[color], variantConfig.class, className)}
      {...props}>
      {children}
    </Component>
  );
}
