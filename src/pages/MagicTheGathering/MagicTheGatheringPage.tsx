import { useMemo, useState } from 'react';
import MtgDeckFilter from './MtgDeckFilter/MtgDeckFilter';
import MagicDeckDisplayCard from './MagicDeckDisplayCard/MagicDeckDisplayCard';
import mtgDecks from './MTG Data/mtg-deck-data';
import type { MtgDeck } from '../../types/mtg-types';
import './MagicTheGatheringPage.css';
import './ManaColors.css';

export default function MagicTheGatheringPage() {
  const [filteredDecks, setFilteredDecks] = useState<MtgDeck[]>(mtgDecks);
  const titleIconChoice = ('rarity');

  const deckComponent = useMemo(() => {
    return filteredDecks.map((deck) => (
      <MagicDeckDisplayCard key={deck.id} deck={deck} />
    ));
  }, [filteredDecks]);

  return (
    <div className="mtg-page">
      <div className="mtg-header">
        <h1>
          <i className={`ms ms-${titleIconChoice}`} />
          Magic: The Gathering Collection
          <i className={`ms ms-${titleIconChoice}`} />
        </h1>
        <div>
          <i className="ms ms-g" />
          <i className="ms ms-r" />
          <i className="ms ms-w" />
          <i className="ms ms-u" />
          <i className="ms ms-b" />
          <i className="ms ms-c" />
        </div>
        <p className='colorful'>
          Our collection of Magic: The Gathering decks, from casual Commander builds to competitive 60-card constructions.
        </p>
      </div>

      <MtgDeckFilter
        decks={mtgDecks}
        onFilteredDecksChange={setFilteredDecks}
      />

      <div className="deck-grid">
        {deckComponent.length > 0 ? (
          deckComponent
        ) : (
          <p className="no-decks">No decks match the current filters.</p>
        )}
      </div>
    </div>
  );
}
