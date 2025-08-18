import { useState } from 'react';
import mtgDecks from './mtg-deck-data';
import MagicDeckDisplayCard from './MagicDeckDisplayCard/MagicDeckDisplayCard';
import type { MtgDeck } from '../../types/mtg-types';
import './MagicTheGatheringPage.css';
import './ManaColors.css';
import MtgDeckFilter from './MtgDeckFilter/MtgDeckFilter';

export default function MagicTheGatheringPage() {
  const [filteredDecks, setFilteredDecks] = useState<MtgDeck[]>(mtgDecks);
  const titleIconChoice = ('rarity');
  
  return (
    <div className="mtg-page">
      <div className="mtg-header">
        <h1>
          <i className={`ms ms-${titleIconChoice}`}></i>
          Magic: The Gathering Collection
          <i className={`ms ms-${titleIconChoice}`}></i>
        </h1>
        <p className='colorful'>
          <i className="ms ms-g"></i>
          <i className="ms ms-r"></i>
          <i className="ms ms-w"></i>
          <i className="ms ms-u"></i>
          <i className="ms ms-b"></i>
          <i className="ms ms-c"></i>
          <br />
          Our collection of Magic: The Gathering decks, from casual Commander builds to competitive 60-card constructions.
        </p>
      </div>

      <MtgDeckFilter
        decks={mtgDecks}
        onFilteredDecksChange={setFilteredDecks}
      />

      <div className="deck-grid">
        {filteredDecks.map((deck) => (
          <MagicDeckDisplayCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}
