import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './Card.css'; // ✅ Import the CSS file

interface CardProps {
  title: string;
  link?: string;
  type?: string;
  tags?: string[];
}

export default function Card({ title, link, type, tags = [] }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const rotateY = ((mouseX / bounds.width) - 0.5) * 10;
      const rotateX = ((mouseY / bounds.height) - 0.5) * -10;

      gsap.to(card, {
        duration: 0.3,
        rotateX,
        rotateY,
        transformPerspective: 900,
        ease: 'power1.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: 'power1.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    gsap.set(card, { transformPerspective: 900 });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
useEffect(() => {
  if (type !== 'twitter') return;

  const scriptExists = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');

  if (!scriptExists) {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  } else {
    // If the script already exists, re-render embedded tweets
    // This is required for React content updates
    (window as any).twttr?.widgets?.load();
  }
}, [type]);

  return (
    <div ref={cardRef} className="aceternity-card">
      <div className="card-inner">
        <h3 className="card-title">{title}</h3>

        <div className="card-content">
          {type === 'youtube' && (
            <iframe
              width="100%"
              height="250"
              src={link?.replace('watch', 'embed').replace('?v=', '/')}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="card-video"
            />
          )}

          {type === 'twitter' && (
            <blockquote className="twitter-tweet">
              <a href={link?.replace('x.com','twitter.com')}>View on Twitter</a>
            </blockquote>
          )}
        </div>

        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span className="card-tag" key={index}>#{tag?.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
