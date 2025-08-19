import type { OwnerStats } from "../MtgDeckAnalysis";

type Props = {
  ownerStat: OwnerStats;
};
export default function OwnerCollectionDataCard({ ownerStat }: Props) {
  return (
    <div key={ownerStat.owner} className="analysis-section owner-stats">
      <h3>{ownerStat.owner}'s Collection</h3>
      <div className="owner-content">
        <div className="deck-counts">
          <div className="count-item">
            <span className="count-value">{ownerStat.totalDecks}</span>
            <span className="count-label">Total Decks</span>
          </div>
          <div className="count-item">
            <span className="count-value">{ownerStat.commanderDecks}</span>
            <span className="count-label">Commander</span>
          </div>
          <div className="count-item">
            <span className="count-value">{ownerStat.sixtyCardDecks}</span>
            <span className="count-label">60-Card</span>
          </div>
        </div>
        
        <div className="color-breakdown">
          <h4>Color Usage</h4>
          <div className="colorful color-stats">
            {Object.entries(ownerStat.colorDistribution)
              .filter(([, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([color, count]) => (
              <div key={color} className="color-stat">
                <i className={`ms ms-${color.toLowerCase()}`}></i>
                <span className="color-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}