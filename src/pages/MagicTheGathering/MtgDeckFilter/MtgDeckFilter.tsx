import { useState } from 'react';
import MtgCollapsibleRegion from '../MtgCollapsibleRegion/MtgCollapsibleRegion';
import { TristateToggle } from '../../../components/TristateToggle/TristateToggle';
import type { TogglePositions } from '../../../components/TristateToggle/TristateToggleTypes';
import { type MtgColor, type DeckType, type DeckStatus, type MtgDeck, deckStatuses, mtgColors } from '../../../types/mtg-types';
import './MtgDeckFilter.css';

type OwnerFilter = 'Leslie' | 'both' | 'Nic';

const ownerToPosition: Record<OwnerFilter, TogglePositions> = {
  Leslie: 'left',
  both: 'center',
  Nic: 'right',
};

const positionToOwner: Record<TogglePositions, OwnerFilter> = {
  left: 'Leslie',
  center: 'both',
  right: 'Nic',
};

interface FilterState {
  ownerFilter: OwnerFilter;
  deckTypes: DeckType[];
  colors: MtgColor[];
  deckStatuses: DeckStatus[];
  colorMatchMode: 'any' | 'exact' | 'contains';
  searchTerm: string;
}

interface MtgDeckFilterProps {
  decks: MtgDeck[];
  onFilteredDecksChange: (filteredDecks: MtgDeck[]) => void;
}

const allDeckTypes: DeckType[] = ['Commander', '60-Card'];
const allColors: MtgColor[] = [...mtgColors];
const allDeckStatuses: DeckStatus[] = [...deckStatuses];

const colorNames: Record<MtgColor, string> = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
  C: 'Colorless'
};

export default function MtgDeckFilter({ decks, onFilteredDecksChange }: MtgDeckFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    ownerFilter: 'both',
    deckTypes: [],
    colors: [],
    deckStatuses: [],
    colorMatchMode: 'any',
    searchTerm: ''
  });

  const applyFilters = (newFilters: FilterState) => {
    let filtered = decks;

    // Filter by search term (names and keyterms)
    if (newFilters.searchTerm.trim()) {
      const searchLower = newFilters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(deck => {
        // Check deck name
        const nameMatch = deck.name.toLowerCase().includes(searchLower);
        
        // Check keyterms
        const keytermsMatch = deck.keyterms?.some(keyterm => 
          keyterm.toLowerCase().includes(searchLower)
        ) || false;
        
        return nameMatch || keytermsMatch;
      });
    }

    // Filter by owner
    if (newFilters.ownerFilter !== 'both') {
      filtered = filtered.filter(deck => deck.owner === newFilters.ownerFilter);
    }

    // Filter by deck types
    if (newFilters.deckTypes.length > 0) {
      filtered = filtered.filter(deck => newFilters.deckTypes.includes(deck.deckType));
    }

    // Filter by colors
    if (newFilters.colors.length > 0) {
      filtered = filtered.filter(deck => {
        switch (newFilters.colorMatchMode) {
          case 'any':
            return newFilters.colors.some(color => deck.colors.includes(color));
          case 'exact':
            return (newFilters.colors.length === deck.colors.length &&
                   newFilters.colors.every(color => deck.colors.includes(color)));
          case 'contains':
            return newFilters.colors.every(color => deck.colors.includes(color));
          default:
            return true;
        }
      });
    }

    // Filter by deck status
    if (newFilters.deckStatuses.length > 0) {
      filtered = filtered.filter(deck => newFilters.deckStatuses.includes(deck.status));
    }

    onFilteredDecksChange(filtered);
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const toggleArrayFilter = <T,>(
    key: keyof Pick<FilterState, 'deckTypes' | 'colors' | 'deckStatuses'>,
    value: T
  ) => {
    const currentArray = filters[key] as T[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterState[typeof key]);
  };

  const clearAllFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clearedFilters: FilterState = {
      ownerFilter: 'both',
      deckTypes: [],
      colors: [],
      deckStatuses: [],
      colorMatchMode: 'any',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };

  const hasActiveFilters = (
    filters.ownerFilter !== 'both'
    || filters.deckTypes.length > 0
    || filters.colors.length > 0
    || filters.deckStatuses.length > 0
    || filters.searchTerm.trim().length > 0
  );

  return (<div className='mtg-filters'>

    {/* Search + Owner toggle — always visible */}
    <div className="search-bar-section">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search deck names and key terms..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="search-input"
        />
        {filters.searchTerm && (
          <button
            className="clear-search"
            onClick={() => updateFilter('searchTerm', '')}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <div className='nic-leslie-toggle-container'>
        <TristateToggle
          id="owner-filter"
          togglePosition={ownerToPosition[filters.ownerFilter]}
          onToggleStateChange={(pos: TogglePositions) => updateFilter(
            'ownerFilter', 
            positionToOwner[pos]
          )}
          labels={{ 
            left: (filters.ownerFilter === 'Leslie' ? '' : 'Leslie'),
            center: '',
            right: (filters.ownerFilter === 'Nic' ? '' : 'Nic') }}
          />
      </div>
    </div>
  
    <MtgCollapsibleRegion 
      title={<>
        <i className="ms ms-ability-collect-evidence" />
        Filter Decks
      </>}
      titleRight={
        hasActiveFilters 
        ? (
          <button className="clear-filters" onClick={clearAllFilters}>
            Clear All
          </button>
        ) : null
      }
    >
      <div className="filter-content">

        {/* Deck Type Filter */}
        <div className="filter-group">
          <h3>Deck Type</h3>
          <div className="filter-options">
            {allDeckTypes.map(deckType => (
              <label key={deckType} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.deckTypes.includes(deckType)}
                  onChange={() => toggleArrayFilter('deckTypes', deckType)}
                />
                <span className="checkmark"></span>
                {deckType}
              </label>
            ))}
          </div>
        </div>

        {/* Colors Filter */}
        <div className="filter-group">
          <h3>Colors</h3>
          <div className="color-match-mode">
            <label>
              <input
                type="radio"
                name="colorMatchMode"
                value="any"
                checked={filters.colorMatchMode === 'any'}
                onChange={() => updateFilter('colorMatchMode', 'any')}
              />
              Any selected colors
            </label>
            <label>
              <input
                type="radio"
                name="colorMatchMode"
                value="contains"
                checked={filters.colorMatchMode === 'contains'}
                onChange={() => updateFilter('colorMatchMode', 'contains')}
              />
              Contains all selected
            </label>
            <label>
              <input
                type="radio"
                name="colorMatchMode"
                value="exact"
                checked={filters.colorMatchMode === 'exact'}
                onChange={() => updateFilter('colorMatchMode', 'exact')}
              />
              Exact color match
            </label>
          </div>
          <div className="filter-options color-options">
            {allColors.map(color => (
              <label key={color} className="filter-checkbox color-checkbox">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => toggleArrayFilter('colors', color)}
                />
                <span className="checkmark"></span>
                <i className={`ms ms-${color.toLowerCase()}`}></i>
                {colorNames[color]}
              </label>
            ))}
          </div>
        </div>

        {/* Deck Status Filter */}
        <div className="filter-group">
          <h3>Deck Status</h3>
          <div className="filter-options">
            {allDeckStatuses.map(status => (
              <label key={status} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.deckStatuses.includes(status)}
                  onChange={() => toggleArrayFilter('deckStatuses', status)}
                />
                <span className="checkmark"></span>
                {status}
              </label>
            ))}
          </div>
        </div>
      </div>
    </MtgCollapsibleRegion>
  </div>);
}
