import type { DeckAnalysisData } from "../MtgDeckAnalysis";
import './DeckCollectionDistribution.css';

type Props = {
  analysisData: DeckAnalysisData;
};
export default function DeckCollectionDistribution({ analysisData }: Props) {
  return (
    <div className="analysis-section distribution">
      <h3>Collection Distribution</h3>
      <div className="distribution-grid">
        <div className="dist-category">
          <h4>Deck Types</h4>
          {analysisData.deckTypeDistribution.map(({ type, count, percentage }) => (
            <div key={type} className="dist-item">
              <span className="dist-label">{type}</span>
              <div className="dist-bar">
                <div 
                  className="dist-fill" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="dist-value">{count}</span>
            </div>
          ))}
        </div>

        <div className="dist-category">
          <h4>Deck Status</h4>
          {analysisData.statusDistribution.map(({ status, count, percentage }) => (
            <div key={status} className="dist-item">
              {
                status == 'Needs Improvement'
                ? <span className="dist-label">
                    <span className="mobile">To Improve</span>
                    <span className="desktop">To Improve</span>
                  </span>
                : <span className="dist-label">{status}</span>
              }
              <div className="dist-bar">
                <div 
                  className="dist-fill status-fill" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="dist-value">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
