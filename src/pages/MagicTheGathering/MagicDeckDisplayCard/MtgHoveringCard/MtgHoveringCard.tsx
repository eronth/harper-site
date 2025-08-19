import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!anchorElement || !tooltipRef.current) return;

    const updatePosition = () => {
      if (!tooltipRef.current || !anchorElement) return;

      const rect = anchorElement.getBoundingClientRect();
      const tooltip = tooltipRef.current;
      
      // Calculate ideal position (below the link, centered)
      let left = rect.left + rect.width / 2;
      let top = rect.bottom + 8;

      // Adjust if tooltip would go off screen
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Adjust horizontal position
      if (left + tooltipRect.width / 2 > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      } else if (left - tooltipRect.width / 2 < 10) {
        left = tooltipRect.width / 2 + 10;
      }

      // Adjust vertical position if tooltip goes below viewport
      if (top + tooltipRect.height > viewportHeight - 10) {
        top = rect.top - tooltipRect.height - 8;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.transform = left === rect.left + rect.width / 2 
        ? 'translateX(-50%)' 
        : 'none';
    };

    // Initial positioning
    updatePosition();

    // Update position on scroll/resize
    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [anchorElement]);

  const tooltipContent = (
    <div ref={tooltipRef} className="card-image-tooltip">
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