import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import './MtgCollapsibleRegion.css';

type Props = {
  title: React.ReactNode;
  titleRight?: React.ReactNode;
  children: React.ReactNode;
};

export default function MtgCollapsibleRegion({ 
  title,
  titleRight,
  children
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (<>
    <div className="mtg-collapsible-region">
      <div className="collapsible-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className='title'>
          {title}
        </span>
        <span className='title-right'>
          {titleRight}
          <span className={`toggle-icons ${isExpanded ? 'expanded' : ''}`}>
            {/* <FontAwesomeIcon icon={faChevronUp} /> */}
            <i className={`ms ms-tap`} />
            <i className={`ms ms-untap`} />
          </span>
        </span>
      </div>
      {isExpanded && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  
  </>);
}
