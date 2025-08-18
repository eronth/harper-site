import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import type { MtgCard } from '../../../../types/mtg-types';
import './CommanderSection.css';

interface Props {
  commander: MtgCard;
  renderManaCost: (manaCost: string) => React.ReactNode;
}

export default function CommanderSection({ 
  commander,
  renderManaCost
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      // Allow animation to complete before hiding content
      setTimeout(() => {
        setIsExpanded(false);
      }, 300);
    } else {
      setIsExpanded(true);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="commander-section" onClick={handleToggle}>
      <div className="commander-header">
        <div className="commander-name">
          {commander.magicardsInfoUrl ? (
            <a
              href={commander.magicardsInfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              <span className="commander-label">
                <i className={'ms ms-commander'}></i>
              </span>
              {commander.name}
            </a>
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
