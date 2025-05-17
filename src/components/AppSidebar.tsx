"use client"

import {  useRef } from "react"
import { gsap } from "gsap"
import { FileText, Hash, LinkIcon, MessageSquare, Search, Video } from "lucide-react"

import { SidebarItem } from "./SidebarItem"

import  Input  from "./ui/Input"
import "./AppSidebar.css"
import { useGSAP } from "@gsap/react"

export function AppSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animate the sidebar
    gsap.from(sidebarRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate the menu items
    if (menuItemsRef.current) {
      const items = menuItemsRef.current.querySelectorAll(".sidebar-item")
      gsap.from(items, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      })
    }
  }, [])

  return (
    <div ref={sidebarRef} className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <span>SB</span>
          </div>
          <div className="sidebar-title">
            <span>Second Brain</span>
          </div>
        </div>
        
      </div>

      {/* Content */}
      <div ref={menuItemsRef} className="sidebar-content">
        <div className="sidebar-menu">
          <SidebarItem icon={MessageSquare} label="Tweets" className="sidebar-item" />
          <SidebarItem icon={Video} label="Videos" className="sidebar-item" />
          <SidebarItem icon={FileText} label="Documents" className="sidebar-item" />
          <SidebarItem icon={LinkIcon} label="Links" className="sidebar-item" />
          <SidebarItem icon={Hash} label="Tags" className="sidebar-item" />
        </div>
      </div>

      {/* Footer */}
      
    </div>
  )
}
