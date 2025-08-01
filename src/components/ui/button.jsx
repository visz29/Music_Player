"use client"

import { forwardRef } from "react"

const Button = forwardRef(
  ({ className = "", variant = "default", size = "default", children, disabled = false, onClick, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variantClasses = {
      default: "bg-gray-900 text-white hover:bg-gray-800",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900",
    }

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className}`

    return (
      <button ref={ref} className={classes} disabled={disabled} onClick={onClick} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
