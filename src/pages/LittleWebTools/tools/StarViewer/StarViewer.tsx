import { useMemo } from "react";
import WebTool from "../../WebTool";
import './StarViewer.css';

const STAR_COUNT = 80;
const stars = [
    '🟅',
    '🟆',
    '🟇',
    '✧',
    '✦',
  ];
const starColors = [
  'color-stone-blue',
  'color-teal',
  'color-brick-red',
  'color-uranium-green',
  'color-plasma-violet',
  'color-radium-pale',
  'color-reactor-orange'
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function StarViewer() {
  const starsArray = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      char: stars[Math.floor(seededRandom(i * 3) * stars.length)],
      color: starColors[Math.floor(seededRandom(i * 3 + 1) * starColors.length)],
      x: seededRandom(i * 3 + 2) * 96,
      y: seededRandom(i * 3 + 3) * 96,
      size: 0.8 + seededRandom(i * 3 + 4) * 1.8,
      twinkleDuration: 2 + seededRandom(i * 3 + 5) * 4,
      twinkleDelay: seededRandom(i * 3 + 6) * 4,
    }));
  }, []);

  return (
    <WebTool css='star-viewer'>
      <div>
        <h1>Star Viewer</h1>
        <div className="star-field">
          {starsArray.map(star => (
            <span
              key={star.id}
              className={`star ${star.color}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                fontSize: `${star.size}rem`,
                '--twinkle-duration': `${star.twinkleDuration}s`,
                '--twinkle-delay': `${star.twinkleDelay}s`,
              } as React.CSSProperties}
            >
              {star.char}
            </span>
          ))}
        </div>
      </div>
    </WebTool>
  );
}
