import { useState } from "react";
import MtgHoveringCard from "../MtgHoveringCard/MtgHoveringCard";
import { mtgCardImages } from "../../../../assets/mtg-cards";
import type { MtgCard } from "../../../../types/mtg-types";

type Props = {
  card: MtgCard;
  hoveredCardReactState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
}; 

export default function MtgCardHoverLink({ card, hoveredCardReactState }: Props) {
  const [hoveredCard, setHoveredCard] = hoveredCardReactState;
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  // Function to convert MTG card URL to image path
  const getCardImagePath = (magicardsInfoUrl: string): string | null => {
    try {
      // First, strip https://magiccards.info/ or https://scryfall.com from the URL
      const strippedUrl = magicardsInfoUrl
        .replace('https://', '')
        .replace('http://', '')
        .replace('magiccards.info/', '')
        .replace('scryfall.com/card/', '');
      const slashToDashText = strippedUrl.replace(/\//g, '-');
      
      // Look up the imported image
      const imageKey = slashToDashText; // Remove .jpg extension for lookup
      const imagePath = mtgCardImages[imageKey];
      
      return imagePath || null;
    } catch (error) {
      console.warn('Error processing card URL:', magicardsInfoUrl, error);
      return null;
    }
  };
  return (<>
    <a
      href={card.magicardsInfoUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        setHoveredCard(card.magicardsInfoUrl || null);
        setAnchorElement(e.currentTarget);
      }}
      onMouseLeave={() => {
        setHoveredCard(null);
        setAnchorElement(null);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {card.name}
    </a>
    {hoveredCard === card.magicardsInfoUrl && card.magicardsInfoUrl 
      && getCardImagePath(card.magicardsInfoUrl) && (
      <MtgHoveringCard
        card={card} 
        imgPath={getCardImagePath(card.magicardsInfoUrl)} 
        anchorElement={anchorElement}
      />
    )}
  </>);
}