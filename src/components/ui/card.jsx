

import { forwardRef } from "react"

const Card = forwardRef(({ className = "", children, onClick, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = "Card"

const CardContent = forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
