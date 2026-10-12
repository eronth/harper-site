import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { applyRetroMode, readRetroMode } from './retro-mode';
import './RetroToggle.css';

// Header switch that flips the whole site into its 1940s–60s skin
export default function RetroToggle() {
  const [retro, setRetro] = useState(readRetroMode);

  useEffect(() => {
    applyRetroMode(retro);
  }, [retro]);

  return (
    <label className="retro-toggle" title="Give the site a 1940s–60s look">
      <input
        type="checkbox"
        role="switch"
        checked={retro}
        onChange={(e) => setRetro(e.target.checked)}
      />
      <FontAwesomeIcon icon={faRecordVinyl} className="retro-toggle-icon" />
      <span className="retro-toggle-caption">Retro</span>
      <span className="retro-toggle-track" aria-hidden="true" />
    </label>
  );
}
