import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { MtgCard } from "../../../../types/mtg-types";
import './MtgHoveringCard.css';

type Props = {
  card: MtgCard;
  imgPath: string | null;
  anchorElement: HTMLElement | null;
}

export default function MtgHoveringCard({ card, imgPath, anchorElement }: Props) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, transform: 'translateX(-50%)' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!anchorElement) return;

    const calculatePosition = () => {
      const rect = anchorElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Estimate tooltip size (standard card image ratio)
      const tooltipWidth = 220; // Approximate width including padding
      const tooltipHeight = 320; // Approximate height including padding
      
      // Calculate ideal position (below the link, centered)
      let left = rect.left + rect.width / 2;
      let top = rect.bottom + 8;
      let transform = 'translateX(-50%)';

      // Adjust horizontal position if needed
      if (left + tooltipWidth / 2 > viewportWidth - 10) {
        left = viewportWidth - tooltipWidth - 10;
        transform = 'none';
      } else if (left - tooltipWidth / 2 < 10) {
        left = 10;
        transform = 'none';
      }

      // Adjust vertical position if tooltip goes below viewport
      if (top + tooltipHeight > viewportHeight - 10) {
        top = rect.top - tooltipHeight - 8;
      }

      setPosition({ left, top, transform });
      
      // Start animation after position is set
      setTimeout(() => setIsVisible(true), 10);
    };

    calculatePosition();

    // Update position on scroll/resize
    const handleUpdate = () => {
      calculatePosition();
    };
    
    window.addEventListener('scroll', handleUpdate);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [anchorElement]);

  const tooltipContent = (
    <div 
      ref={tooltipRef} 
      className={`card-image-tooltip ${isVisible ? 'visible' : ''}`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: position.transform
      }}
    >
      <img 
        src={imgPath || undefined} 
        alt={card.name}
        className="card-preview-image"
        onError={(e) => {
          // Hide tooltip if image fails to load
          const target = e.target as HTMLImageElement;
          const tooltip = target.closest('.card-image-tooltip') as HTMLElement;
          if (tooltip) {
            tooltip.style.display = 'none';
          }
        }}
      />
    </div>
  );

  // Render tooltip at document body level to escape all stacking contexts
  return createPortal(tooltipContent, document.body);
}