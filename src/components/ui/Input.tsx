import type React from "react"
import { forwardRef } from "react"
import "./Input.css"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={`input ${className || ""}`} ref={ref} {...props} />
})
Input.displayName = "Input"

export { Input }
