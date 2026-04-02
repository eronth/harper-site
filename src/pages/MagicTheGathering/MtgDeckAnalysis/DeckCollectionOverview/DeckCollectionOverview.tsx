import type { DeckAnalysisData } from "../MtgDeckAnalysis";
import './DeckCollectionOverview.css';

export default function DeckCollectionOverview({ analysisData }: { analysisData: DeckAnalysisData }) {
  return (
    <div className="analysis-section overview">
      <h3>Collection Overview</h3>
      <div className="stat-grid">
        <div className="stat-item">
          <span className="stat-value">{analysisData.totalDecks}</span>
          <span className="stat-label">Total Decks</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{analysisData.averageColorsPerDeck.toFixed(1)}</span>
          <span className="stat-label">Avg Colors/Deck</span>
        </div>
        <div className="stat-item popular-combo">
          <span className="stat-label">Top Color Combos</span>
          <div className="popular-combos-list">
            {analysisData.mostPopularColorCombinations.map((combo, i) => (
              <div key={i} className="popular-combo-row stat-value">
                <span className="combo-rank">#{i + 1}</span>
                <div className="combo-colors">
                  {combo.colors.map(color => (
                    <i key={color} className={`ms ms-${color.toLowerCase()}`}></i>
                  ))}
                </div>
                <span className="combo-count">{combo.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
