import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

import Card from "../components/ui/Card"
import "./dashboard.css"
import { backendUrl } from "../config"

function PublicDashboard() {
  const { shareLink } = useParams()
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [contentData, setContentData] = useState([])
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/brain/${shareLink}`)
        setContentData(res.data.content || [])
        setUsername(res.data.username || "Unknown User")
      } catch (err) {
        console.error("Error fetching shared content:", err)
      }
    }

    if (shareLink) fetchSharedData()
  }, [shareLink])

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.7,
    })
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
      })
    }
  }, [contentData])

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="main-content-inner">
          <div ref={headerRef} className="main-header">
            <h1 className="main-title">{username}'s Shared Notes</h1>
          </div>
          <div className="flex min-h-screen gap-4 flex-wrap" ref={cardsRef}>
            {contentData.map((item, index) => (
              <Card
                key={index}
                //@ts-ignore
                title={item?.title}
                //@ts-ignore
                link={item?.link}
                //@ts-ignore
                type={item?.type}
                //@ts-ignore
                tags={item?.tags}
                //@ts-ignore
                className="card-item"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicDashboard
