

import { useState, useEffect, forwardRef } from "react"

const Sheet = ({ children, open, onOpenChange }) => {
  return <div>{children}</div>
}

const SheetTrigger = ({ children, asChild, onClick, ...props }) => {
  return (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  )
}

const SheetContent = forwardRef(({ side = "right", className = "", children, open, onClose, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setIsVisible(true)
      // Prevent body scroll
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  const sideClasses = {
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  }

  const slideClasses = {
    top: isVisible ? "translate-y-0" : "-translate-y-full",
    bottom: isVisible ? "translate-y-0" : "translate-y-full",
    left: isVisible ? "translate-x-0" : "-translate-x-full",
    right: isVisible ? "translate-x-0" : "translate-x-full",
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet Content */}
      <div
        ref={ref}
        className={`fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out ${sideClasses[side]} ${slideClasses[side]} ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
