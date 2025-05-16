import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import gsap from "gsap"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// GSAP utility functions
export const animateCardHover = (element: HTMLElement, isHovering: boolean) => {
  if (isHovering) {
    gsap.to(element, {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    })
  } else {
    gsap.to(element, {
      y: 0,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      duration: 0.5,
      ease: "power2.out",
    })
  }
}

export const animateSidebarItemHover = (element: HTMLElement, isHovering: boolean) => {
  const icon = element.querySelector(".icon")
  const text = element.querySelector(".text")

  if (isHovering) {
    gsap.to(element, {
      backgroundColor: "rgba(124, 58, 237, 0.1)",
      duration: 0.3,
    })
    if (icon) {
      gsap.to(icon, {
        color: "#7c3aed",
        scale: 1.1,
        duration: 0.3,
      })
    }
    if (text) {
      gsap.to(text, {
        x: 3,
        color: "#7c3aed",
        duration: 0.3,
      })
    }
  } else {
    gsap.to(element, {
      backgroundColor: "transparent",
      duration: 0.5,
    })
    if (icon) {
      gsap.to(icon, {
        color: "#71717a",
        scale: 1,
        duration: 0.5,
      })
    }
    if (text) {
      gsap.to(text, {
        x: 0,
        color: "#71717a",
        duration: 0.5,
      })
    }
  }
}
