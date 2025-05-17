// components/ui/ShareLinkModal.tsx
import React from "react"
import "./ShareLinkModal.css"
import { toast } from "react-toastify"

interface ShareLinkModalProps {
  open: boolean
  onClose: () => void
  link: string
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ open, onClose, link }) => {
  if (!open) return null

  const fullLink = `${window.location.origin}/brain/share/${link}`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLink)
    toast.success("Link copied to clipboard!", {
      autoClose: 2000,
      position: "top-right",
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Shareable Link</h2>
        <p className="modal-link">{fullLink}</p>
        <div className="modal-actions">
          <button className="modal-button copy" onClick={handleCopy}>Copy Link</button>
          <button className="modal-button close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
