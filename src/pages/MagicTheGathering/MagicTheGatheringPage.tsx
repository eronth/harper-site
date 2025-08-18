import mtgDecks from './mtg-deck-data';
import MagicDeckDisplayCard from './MagicDeckDisplayCard/MagicDeckDisplayCard';
import './MagicTheGatheringPage.css';
import './ManaColors.css';

export default function MagicTheGatheringPage() {
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

      <div className="deck-grid">
        {mtgDecks.map((deck) => (
          <MagicDeckDisplayCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}
