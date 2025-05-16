"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/Button"
import { useTheme } from "./ThemeProvider"
import "./ThemeToggle.css"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="theme-toggle"
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      <Sun className={`theme-icon sun ${theme === "dark" ? "hidden" : ""}`} />
      <Moon className={`theme-icon moon ${theme === "light" ? "hidden" : ""}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
