// src/components/ui/Button.tsx
import {ReactNode} from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: "primary" | "outline" | "ghost";
 children: ReactNode;
}

export function Button({
 variant = "primary",
 children,
 className = "",
 ...props
}: ButtonProps) {
 const baseClasses =
  "px-6 py-3 rounded-md font-medium transition-colors duration-300";

 const variantClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  ghost: "text-indigo-600 hover:bg-indigo-50",
 };

 return (
  <button
   className={`${baseClasses} ${variantClasses[variant]} ${className}`}
   {...props}>
   {children}
  </button>
 );
}
