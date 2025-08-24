import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import type { MtgCard } from '../../../../types/mtg-types';
import MtgCardHoverLink from '../MtgCardHoverLink/MtgCardHoverLink';
import './CommanderSection.css';

interface Props {
  commander: MtgCard;
  renderManaCost: (manaCost: string) => React.ReactNode;
  hoveredCardReactState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
}

export default function CommanderSection({ 
  commander,
  renderManaCost,
  hoveredCardReactState
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="commander-section" onClick={handleToggle}>
      <div className="commander-header">
        <div className="commander-name">
          {commander.magicardsInfoUrl ? (
            <MtgCardHoverLink
              card={commander}
              hoveredCardReactState={hoveredCardReactState}
            />
          ) : (
            <span className="commander-name-text">{commander.name}</span>
          )}
        </div>
        <div className="right-side">
          {commander.manaCost && (
            <div className="commander-cost">{renderManaCost(commander.manaCost)}</div>
          )}
          <FontAwesomeIcon
            icon={faChevronUp}
            className={`expand-icon commander-chevron ${isExpanded ? 'expanded' : ''}`}
          />
        </div>
      </div>

      {commander.description && (
        <div className={`commander-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {commander.description}
        </div>
      )}
    </div>
  );
};
