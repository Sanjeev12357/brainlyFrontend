"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Plus, Share } from "lucide-react"

import { AppSidebar } from "./components/AppSidebar"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { ThemeProvider } from "./components/ThemeProvider"
import "./App.css"
import { useGSAP } from "@gsap/react"

function App() {
  const mainRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animation for the header
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animation for the cards
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".card-item")
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      })
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="second-brain-theme">
      <div className="app-container">
        <AppSidebar />
        <div className="main-content">
          <div ref={mainRef} className="main-content-inner">
            <div ref={headerRef} className="main-header">
              <h1 className="main-title">All Notes</h1>
              <div className="header-actions">
                <Button variant="outline" size="small" className="share-button">
                  <Share className="button-icon" />
                  <span>Share Brain</span>
                </Button>
                <Button size="small" className="add-button">
                  <Plus className="button-icon" />
                  <span>Add Content</span>
                </Button>
              </div>
            </div>
            <div className="content-area">
              <div ref={cardsRef} className="cards-grid">
                <Card className="card-item">
                  <div className="card-header">
                    <h3 className="card-title">Project Ideas</h3>
                    <div className="card-actions">
                      <Button variant="ghost" size="icon" className="card-action-button">
                        <span className="sr-only">Share</span>
                        <Share className="button-icon" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="card-subtitle">Future Projects</h4>
                  <ul className="card-list">
                    <li className="card-list-item">
                      <span className="list-bullet">•</span>
                      <span>Build a personal knowledge base</span>
                    </li>
                    <li className="card-list-item">
                      <span className="list-bullet">•</span>
                      <span>Create a habit tracker</span>
                    </li>
                    <li className="card-list-item">
                      <span className="list-bullet">•</span>
                      <span>Design a minimalist todo app</span>
                    </li>
                  </ul>
                  <div className="card-tags">
                    <span className="card-tag">#productivity</span>
                    <span className="card-tag">#ideas</span>
                  </div>
                  <div className="card-date">Added on 10/05/2024</div>
                </Card>

                <Card className="card-item">
                  <div className="card-header">
                    <h3 className="card-title">How to Build a Second Brain</h3>
                    <div className="card-actions">
                      <Button variant="ghost" size="icon" className="card-action-button">
                        <span className="sr-only">Share</span>
                        <Share className="button-icon" />
                      </Button>
                    </div>
                  </div>
                  <div className="card-image">
                    <div className="card-image-placeholder">📝</div>
                  </div>
                  <div className="card-tags">
                    <span className="card-tag">#productivity</span>
                    <span className="card-tag">#learning</span>
                  </div>
                  <div className="card-date">Added on 09/01/2024</div>
                </Card>

                <Card className="card-item">
                  <div className="card-header">
                    <h3 className="card-title">Productivity Tip</h3>
                    <div className="card-actions">
                      <Button variant="ghost" size="icon" className="card-action-button">
                        <span className="sr-only">Share</span>
                        <Share className="button-icon" />
                      </Button>
                    </div>
                  </div>
                  <p className="card-text">
                    The best way to learn is to build in public. Share your progress, get feedback, and help others
                    along the way.
                  </p>
                  <div className="card-tags">
                    <span className="card-tag">#productivity</span>
                    <span className="card-tag">#learning</span>
                  </div>
                  <div className="card-date">Added on 08/07/2024</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
