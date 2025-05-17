import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './CreateContentModal.css';
import { Button } from './Button';
import { backendUrl } from '../../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//@ts-ignore
import { useNavigate } from 'react-router-dom';

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}
//@ts-ignore
enum ContentType {
  Youtube = 'youtube',
  Twitter = 'twitter',
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return;
    if (open) {
      gsap.to(modalRef.current, {
        duration: 0.3,
        opacity: 1,
        ease: 'power2.out'
      });
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { duration: 0.4, delay: 0.1, opacity: 1, y: 0, scale: 1, ease: 'back.out(1.2)' }
      );
    }
  }, [open]);

  const handleClose = () => {
    if (!modalRef.current || !contentRef.current) return;
    gsap.to(contentRef.current, {
      duration: 0.3,
      opacity: 0,
      y: -20,
      scale: 0.95,
      ease: 'power2.in'
    });
    gsap.to(modalRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  const handleSubmit = async () => {
    if (!title || !link || !type) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
      //@ts-ignore
      const response = await axios.post(`${backendUrl}/api/v1/content`, {
        title,
        link,
        type,
        tags: tagsArray,
      },{
        headers:{
            authorization:token
        }
      });

      toast.success("Content created successfully!",{autoClose: 2000});
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create content.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div ref={modalRef} className="modal-overlay" onClick={handleClose} style={{ opacity: 0 }}>
      <ToastContainer position="top-center" />
      <div
        ref={contentRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 0 }}
      >
        <div className="modal-header">
          <h3>Create New Content</h3>
          <button className="close-button" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="close-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="form-section">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        <div className="form-section">
          <label htmlFor="link">Link</label>
          <input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-section">
          <label>Content Type</label>
          <div className="type-grid">
            {[ContentType.Youtube, ContentType.Twitter].map((contentType) => (
              <button
                key={contentType}
                type="button"
                className={`type-button ${type === contentType ? 'active' : ''}`}
                onClick={() => setType(contentType)}
              >
                {contentType}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g., productivity, knowledge, learning"
          />
        </div>

        <div className="submit-section">
            //@ts-ignore
          <Button
  variant="secondary"
  text={loading ? "Creating..." : "Create Content"}
  onClick={handleSubmit}
  //disabled={loading}
/>

        </div>
      </div>
    </div>
  );
}
