import type { MtgColor, MtgDeck } from "../../../types/mtg-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faCheck, 
  faExclamationTriangle, 
  faWrench, 
  faBox 
} from '@fortawesome/free-solid-svg-icons';
import CommanderSection from './CommanderSection/CommanderSection';
import './MagicDeckDisplayCard.css';

// Helper function to convert mana cost string to mana symbols
const renderManaCost = (manaCost: string) => {
  if (!manaCost) return null;
  
  // Parse mana cost string like "3RWB" or "{3}{R}{W}{B}"
  const symbols = manaCost
    .replace(/[{}]/g, '') // Remove braces if present
    .split('')
    .map((symbol, index) => {
      const lowerSymbol = symbol.toLowerCase();
      let className = '';
      
      // Handle different mana symbols
      if (/\d/.test(symbol)) {
        className = `ms ms-${symbol}`;
      } else if (['w', 'u', 'b', 'r', 'g', 'c'].includes(lowerSymbol)) {
        className = `ms ms-${lowerSymbol}`;
      } else if (symbol === 'X' || symbol === 'x') {
        className = 'ms ms-x';
      } else {
        return symbol; // Return as text if not recognized
      }
      
      return <i key={index} className={className}></i>;
    });
  
  return <span className="mana-cost">{symbols}</span>;
};

// Helper function to get mana symbol for color
const getManaSymbol = (color: MtgColor) => {
  const colorMap: { [key in MtgColor]: string } = {
    'W': 'ms ms-w',
    'U': 'ms ms-u', 
    'B': 'ms ms-b',
    'R': 'ms ms-r',
    'G': 'ms ms-g',
    'C': 'ms ms-c'
  };
  
  return colorMap[color] || 'ms ms-c';
};


export default function MagicDeckDisplayCard({ deck }: { deck: MtgDeck }) {
  const getDeckTypeClass = (deckType: string): string => {
    return deckType === 'Commander' ? 'deck-type-commander' : 'deck-type-60card';
  };

  const getOwnerClass = (owner: string): string => {
    return owner === 'Nic' ? 'owner-nic' : 'owner-leslie';
  };

  const getStatusClass = (status: string): string => {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  };

  return (<>
    <div key={deck.id} className="deck-card colorful">
      <div className="deck-header">
        <h3 className="deck-title">
          <span className="deck-colors">
            {deck.colors.map((color, index) => (
              <i key={index} className={getManaSymbol(color)}></i>
            ))}
          </span>
          <span className="deck-name">
            {deck.name}
          </span>
        </h3>
        <div className={getDeckTypeClass(deck.deckType)}>
          {deck.deckType}
        </div>
      </div>

      <div className="deck-info">
        

        <div className="short-description">
          {deck.shortDescription}
        </div>

        
        {deck.commander && (
          <CommanderSection 
            commander={deck.commander} 
            renderManaCost={renderManaCost}
          />
        )}

        <div className="long-description">
          {deck.longDescription}
        </div>

        {deck.keyCards && deck.keyCards.length > 0 && (
          <div className="key-cards">
            <h4>Key Cards:</h4>
            <div className="key-cards-list">
              {deck.keyCards.map((card, index) => (
                <div key={index} className="key-card">
                  <div className="key-card-content">
                    <div className="key-card-name-line">
                      {card.magicardsInfoUrl ? (
                        <a href={card.magicardsInfoUrl} target="_blank" rel="noopener noreferrer">
                          {card.name}
                        </a>
                      ) : (
                        <span className="card-name">{card.name}</span>
                      )}
                      {card.manaCost && (
                        <span className="key-card-cost">{renderManaCost(card.manaCost)}</span>
                      )}
                    </div>
                    {card.description && (
                      <div className="key-card-description">{card.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="deck-details">
        <div className="deck-meta">
          <div className="meta-item owner-item">
            <div className="meta-icon owner-icon">
              <i className="ms ms-planeswalker"></i>
            </div>
            <div className="meta-content">
              <span className={`meta-value owner ${getOwnerClass(deck.owner)}`}>
                {deck.owner}
              </span>
            </div>
          </div>

          <div className="meta-item storage-info">
            <div className="meta-icon storage-icon">
              <FontAwesomeIcon icon={faBox} />
            </div>
            <div className="meta-content">
              <span className="meta-value storage-value">
                {deck.location.case && (
                  <span className="case-name">{deck.location.case}</span>
                )}
                {deck.location.case && deck.location.deckbox && (
                  <span className="separator"> → </span>
                )}
                <span className="deckbox-name">{deck.location.deckbox}</span>
              </span>
            </div>
          </div>

          <div className="meta-item status-item">
            <div className="meta-icon status-icon">
              {deck.status === 'Great' && <FontAwesomeIcon icon={faStar} />}
              {deck.status === 'Good' && <FontAwesomeIcon icon={faCheck} />}
              {deck.status === 'Needs Improvement' && <FontAwesomeIcon icon={faExclamationTriangle} />}
              {deck.status === 'Incomplete' && <FontAwesomeIcon icon={faWrench} />}
            </div>
            <div className="meta-content">
              <span className={`meta-value status ${getStatusClass(deck.status)}`}>
                {deck.status}
              </span>
            </div>
          </div>
        
        </div>

      </div>
    </div>
  </>)
}
