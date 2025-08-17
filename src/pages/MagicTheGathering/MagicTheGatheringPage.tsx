import mtgDecks from './mtg-deck-data';
import MagicDeckDisplayCard from './MagicDeckDisplayCard/MagicDeckDisplayCard';
import './MagicTheGatheringPage.css';

export default function MagicTheGatheringPage() {
  return (
    <div className="mtg-page">
      <div className="mtg-header">
        <h1>
          <i className="ms ms-planeswalker"></i>
          Magic: The Gathering Collection
        </h1>
        <p>
          <i className="ms ms-w"></i>
          <i className="ms ms-u"></i>
          <i className="ms ms-b"></i>
          <i className="ms ms-r"></i>
          <i className="ms ms-g"></i>
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
