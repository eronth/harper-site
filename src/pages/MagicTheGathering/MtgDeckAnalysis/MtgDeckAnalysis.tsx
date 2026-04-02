import { useMemo } from 'react';
import type { MtgColor, DeckType, Owner, DeckStatus, MtgDeck } from '../../../types/mtg-types';
import MtgCollapsibleRegion from '../MtgCollapsibleRegion/MtgCollapsibleRegion';
import OwnerCollectionDataCard from './OwnerCollectionDataCard/OwnerCollectionDataCard';
import DeckCollectionDistribution from './DeckCollectionDistribution/DeckCollectionDistribution';
import './MtgDeckAnalysis.css';
import DeckCollectionOverview from './DeckCollectionOverview/DeckCollectionOverview';

interface MtgDeckAnalysisProps {
  decks: MtgDeck[];
}

interface ColorStats {
  [key: string]: number;
}

export type OwnerStats = {
  owner: Owner;
  totalDecks: number;
  commanderDecks: number;
  sixtyCardDecks: number;
  averageColors: number;
  statusBreakdown: Record<DeckStatus, number>;
  colorDistribution: ColorStats;
}

export type DeckAnalysisData = {
  totalDecks: number;
  ownerStats: OwnerStats[];
  colorPopularity: { color: MtgColor; count: number; percentage: number }[];
  deckTypeDistribution: { type: DeckType; count: number; percentage: number }[];
  statusDistribution: { status: DeckStatus; count: number; percentage: number }[];
  averageColorsPerDeck: number;
  mostPopularColorCombinations: { colors: MtgColor[]; count: number }[];
}

export default function MtgDeckAnalysis({ decks }: MtgDeckAnalysisProps) {
  const analysisData = useMemo((): DeckAnalysisData => {
    const totalDecks = decks.length;
    
    // Color popularity
    const colorCounts: Record<MtgColor, number> = { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };
    const colorCombinations: { [key: string]: number } = {};
    
    decks.forEach(deck => {
      deck.colors.forEach(color => {
        colorCounts[color]++;
      });
      
      const sortedColors = [...deck.colors].sort().join('');
      colorCombinations[sortedColors] = (colorCombinations[sortedColors] || 0) + 1;
    });
    
    const colorPopularity = Object.entries(colorCounts).map(([color, count]) => ({
      color: color as MtgColor,
      count,
      percentage: totalDecks > 0 ? (count / totalDecks) * 100 : 0
    })).sort((a, b) => b.count - a.count);
    
    // Most popular color combinations (top 3)
    const mostPopularColorCombinations = Object.entries(colorCombinations)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([combo, count]) => ({
        colors: combo.split('') as MtgColor[],
        count
      }));
    
    // Deck type distribution
    const deckTypeCounts: Record<DeckType, number> = { 'Commander': 0, '60-Card': 0 };
    decks.forEach(deck => {
      deckTypeCounts[deck.deckType]++;
    });
    
    const deckTypeDistribution = Object.entries(deckTypeCounts).map(([type, count]) => ({
      type: type as DeckType,
      count,
      percentage: totalDecks > 0 ? (count / totalDecks) * 100 : 0
    }));
    
    // Status distribution
    const statusCounts: Record<DeckStatus, number> = { 
      'Incomplete': 0,
      'Testing': 0,
      'Needs Improvement': 0,
      'Good': 0,
      'Great': 0,
      'Retired': 0,
    };
    decks.forEach(deck => {
      statusCounts[deck.status]++;
    });
    
    const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
      status: status as DeckStatus,
      count,
      percentage: totalDecks > 0 ? (count / totalDecks) * 100 : 0
    })).filter(({ count }) => count > 0);
    
    // Owner statistics
    const owners: Owner[] = ['Nic', 'Leslie'];
    const ownerStats: OwnerStats[] = owners.map(owner => {
      const ownerDecks = decks.filter(deck => deck.owner === owner);
      const totalOwnerDecks = ownerDecks.length;
      
      const commanderDecks = ownerDecks.filter(deck => deck.deckType === 'Commander').length;
      const sixtyCardDecks = ownerDecks.filter(deck => deck.deckType === '60-Card').length;
      
      const statusBreakdown: Record<DeckStatus, number> = {
        'Incomplete': 0,
        'Testing': 0,
        'Needs Improvement': 0,
        'Good': 0,
        'Great': 0,
        'Retired': 0,
      };
      
      const ownerColorCounts: ColorStats = { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };
      
      ownerDecks.forEach(deck => {
        statusBreakdown[deck.status]++;
        deck.colors.forEach(color => {
          ownerColorCounts[color]++;
        });
      });
      
      const totalColors = ownerDecks.reduce((sum, deck) => sum + deck.colors.length, 0);
      const averageColors = totalOwnerDecks > 0 ? totalColors / totalOwnerDecks : 0;
      
      return {
        owner,
        totalDecks: totalOwnerDecks,
        commanderDecks,
        sixtyCardDecks,
        averageColors,
        statusBreakdown,
        colorDistribution: ownerColorCounts
      };
    }).filter(stats => stats.totalDecks > 0);
    
    // Average colors per deck
    const totalColors = decks.reduce((sum, deck) => sum + deck.colors.length, 0);
    const averageColorsPerDeck = totalDecks > 0 ? totalColors / totalDecks : 0;
    
    return {
      totalDecks,
      ownerStats,
      colorPopularity,
      deckTypeDistribution,
      statusDistribution,
      averageColorsPerDeck,
      mostPopularColorCombinations
    };
  }, [decks]);

  const fullChildNode = (
    <div className="analysis-content">
      <p className="analysis-description">Quick insights into your Magic: The Gathering collection</p>
        
      {/* Collection Overview */}
      <DeckCollectionOverview analysisData={analysisData} />

      {/* Owner Breakdown */}
      <div className="owner-breakdown">
        {analysisData.ownerStats.map(ownerStat => (
          <OwnerCollectionDataCard key={ownerStat.owner} ownerStat={ownerStat} />
        ))}
      </div>

      {/* Collection Distribution */}
      <DeckCollectionDistribution analysisData={analysisData} />
    </div>
  );
  const emptyChildNode = (
    <div className="analysis-content">
      <p>No decks available for analysis</p>
    </div>
  );

  const childNode = (
    analysisData.totalDecks === 0
      ? emptyChildNode
      : fullChildNode
  );

  return (
    <div className="mtg-deck-analysis">
      <MtgCollapsibleRegion
        title={<>
          <i className="ms ms-ability-adventure" />
          Collection Analysis
        </>}
        titleRight={<>
          <div className="analysis-summary">
            {analysisData.totalDecks} deck{analysisData.totalDecks !== 1 ? 's' : ''} • {analysisData.averageColorsPerDeck.toFixed(1)} avg colors
          </div>
        </>}
      >
        {childNode}
      </MtgCollapsibleRegion>      
    </div>
  );
}
