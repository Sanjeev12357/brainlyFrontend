"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaPlus } from "react-icons/fa"
import { ShareLinkModal } from "./ShareLinkModal"
import { AppSidebar } from "../components/AppSidebar"
import { Button } from "../components/ui/Button"
import Card from "../components/ui/Card"
import { CreateContentModal } from "../components/ui/CreateContentModal"
import "./dashboard.css"
import { backendUrl } from "../config"
import { toast } from "react-toastify"

function Dashboard() {
  const mainRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [token, setToken] = useState<string | null>('');
  const navigate = useNavigate()
 

  const [contentData, setContentData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [shareLink, setShareLink] = useState("")


  // Fetch content from backend
  const getData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/content`, {
        headers: {
          authorization: token,
        },
      })
      setContentData(response.data.content || []) // adjust based on actual backend response
      console.log("Content data:", response.data)
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  useEffect(() => {
     const t = localStorage.getItem("token");
     setToken(t);
     console.log(t);
    if (!t) {
      navigate("/sign-in")
      return
    }

    getData()
  }, [token])

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

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
  }, [contentData])

  const createShareLink = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/sign-in")
      return
    }

    const response = await axios.post(`${backendUrl}/api/v1/brain/share`, { share: true }, {
      headers: { authorization: token }
    })

    const link = response.data.link
    setShareLink(link)
    setIsShareModalOpen(true)

    toast.success("Link shared successfully!", { autoClose: 2000 })
  } catch (error) {
    toast.error("Error sharing the link")
    console.error("Error sharing the link:", error)
  }
}
   

  return (
    <div>
         <ShareLinkModal
  open={isShareModalOpen}
  onClose={() => setIsShareModalOpen(false)}
  link={shareLink}
/>
      <CreateContentModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          getData() // Refresh content after modal closes
        }}
      />

      <div className="app-container">
        <AppSidebar />
        <div className="main-content">
          <div ref={mainRef} className="main-content-inner">
            <div ref={headerRef} className="main-header">
              <h1 className="main-title">All Notes</h1>
              <div className="header-actions">
                <Button
                  variant="primary"
                  text="Add Content"
                  startIcon={<FaPlus />}
                  onClick={() => setIsModalOpen(true)}
                />
                <Button
                  variant="secondary"
                  text="Share Content"
                  startIcon={<FaPlus />}
                  onClick={() => createShareLink()}
                />
              </div>
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
    </div>
  )
}

export default Dashboard
