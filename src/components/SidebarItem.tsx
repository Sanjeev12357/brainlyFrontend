"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import "./SidebarItem.css"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  className?: string
  badge?: number
}

export function SidebarItem({ icon: Icon, label, className, badge }: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`sidebar-item ${isHovered ? "hovered" : ""} ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`sidebar-item-icon ${isHovered ? "hovered" : ""}`}>
        <Icon className="icon" />
      </div>
      <span className={`sidebar-item-label ${isHovered ? "hovered" : ""}`}>{label}</span>
      {badge && <span className="sidebar-item-badge">{badge}</span>}
    </div>
  )
}
