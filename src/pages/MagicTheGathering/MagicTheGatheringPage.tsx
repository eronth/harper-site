import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import type { MtgDeck, MtgColor } from '../../types/mtg-types';
import mtgDecks from './mtg-deck-data';
import './MagicTheGatheringPage.css';

export default function MagicTheGatheringPage() {
  const getColorSymbolClass = (color: MtgColor): string => {
    return `color-${color}`;
  };

  const getDeckTypeClass = (deckType: string): string => {
    return deckType === 'Commander' ? 'deck-type-commander' : 'deck-type-60card';
  };

  const getOwnerClass = (owner: string): string => {
    return owner === 'Nic' ? 'owner-nic' : 'owner-leslie';
  };

  const getStatusClass = (status: string): string => {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  };

  const renderDeckCard = (deck: MtgDeck) => (
    <div key={deck.id} className="deck-card">
      <div className="deck-header">
        <h3 className="deck-title">{deck.name}</h3>
        <div className="deck-colors">
          {deck.colors.map((color, index) => (
            <div key={index} className={`color-symbol ${getColorSymbolClass(color)}`}>
              {color}
            </div>
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
              <div className="commander-cost">{deck.commander.manaCost}</div>
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
                  {card.magicardsInfoUrl ? (
                    <a href={card.magicardsInfoUrl} target="_blank" rel="noopener noreferrer">
                      {card.name}
                    </a>
                  ) : card.name}
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
  );

  return (
    <div className="mtg-page">
      <div className="mtg-header">
        <h1>
          <FontAwesomeIcon icon={faMagic} style={{ marginRight: '0.5rem', color: '#8e44ad' }} />
          Magic: The Gathering Collection
        </h1>
        <p>
          Our collection of Magic: The Gathering decks, from casual Commander builds to competitive 60-card constructions.
          Each deck represents hours of careful planning, testing, and refinement.
        </p>
      </div>

      <div className="deck-grid">
        {mtgDecks.map(renderDeckCard)}
      </div>
    </div>
  );
}
