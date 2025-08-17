import type { MtgColor, MtgDeck } from "../../../types/mtg-types";
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
    <div key={deck.id} className="deck-card">
      <div className="deck-header">
        <h3 className="deck-title">{deck.name}</h3>
        <div className="deck-colors">
          {deck.colors.map((color, index) => (
            <i key={index} className={getManaSymbol(color)}></i>
          ))}
        </div>
      </div>

      <div className="deck-info">
        <div className={getDeckTypeClass(deck.deckType)}>
          {deck.deckType}
        </div>
        
        {deck.commander && (
          <div className="commander-info">
            <div className="commander-name">
              Commander: {deck.commander.magicardsInfoUrl ? (
                <a href={deck.commander.magicardsInfoUrl} target="_blank" rel="noopener noreferrer">
                  {deck.commander.name}
                </a>
              ) : deck.commander.name}
            </div>
            {deck.commander.manaCost && (
              <div className="commander-cost">{renderManaCost(deck.commander.manaCost)}</div>
            )}
          </div>
        )}

        <div className="short-description">
          {deck.shortDescription}
        </div>

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
                    {card.magicardsInfoUrl ? (
                      <a href={card.magicardsInfoUrl} target="_blank" rel="noopener noreferrer">
                        {card.name}
                      </a>
                    ) : card.name}
                    {card.manaCost && (
                      <div className="key-card-cost">{renderManaCost(card.manaCost)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="deck-details">
        <div className="detail-group">
          <span className="detail-label">Owner:</span>
          <span className={`detail-value ${getOwnerClass(deck.owner)}`}>
            {deck.owner}
          </span>
        </div>
        <div className="detail-group">
          <span className="detail-label">Status:</span>
          <span className={`detail-value ${getStatusClass(deck.status)}`}>
            {deck.status}
          </span>
        </div>
        <div className="detail-group">
          <span className="detail-label">Deckbox:</span>
          <span className="detail-value">{deck.deckbox}</span>
        </div>
        <div className="detail-group">
          <span className="detail-label">Case:</span>
          <span className="detail-value">{deck.case}</span>
        </div>
      </div>
    </div>
  </>)
}
