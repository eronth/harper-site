import React, { useState } from 'react';
import './WeddingRegistryPage.css';

const WeddingRegistry: React.FC = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number;
    randomX: number;
    randomY: number;
    duration: number;
    color: number;
  }>>([]);
  const [confettiCounter, setConfettiCounter] = useState(0);

  const handlePopperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sendConfetti(e, { xAngle: 0.4, yAngle: 0.7, xStrength: 0.5, yStrength: 0.8 });
  };

  const handlePartyClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    sendConfetti(e, { xAngle: 0.5, yAngle: -0.45, xStrength: 0.3, yStrength: 0.4 });
  };

  type ConfettiOptions = {
    xAngle: number;
    xStrength: number;
    yAngle: number;
    yStrength: number;
  };
  const sendConfetti = (e: React.MouseEvent<HTMLSpanElement>, options?: ConfettiOptions) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    const currentCounter = confettiCounter;
    const nextCounter = currentCounter + 20;

    // Create 20 confetti pieces with random values
    // Regular spread for the party emoji
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: currentCounter + i,
      x: clickX,
      y: clickY,
      randomX: (options?.xAngle ?? 0) + Math.random() * (options?.xStrength ?? 1),
      randomY: (options?.yAngle ?? 0) + Math.random() * (options?.yStrength ?? 1),
      duration: 1.1 + Math.random() * 0.5,
      color: i % 6,
    }));

    setConfettiPieces(prev => [...prev, ...newConfetti]);
    setConfettiCounter(nextCounter);

    // Remove these specific confetti pieces after animation completes
    setTimeout(() => {
      setConfettiPieces(prev => prev.filter(piece => piece.id < currentCounter || piece.id >= nextCounter));
    }, 1600);
  }

  return (
    <div className="page-content">
      <div className="registry-container">
        <h1 className="sparkle-title">
          <span className="sparkle">✨</span>
          Wedding Registry
          <span className="sparkle">✨</span>
        </h1>
        
        <div className="registry-message">
          <p className="main-message">
            Guys... we're both in our 30s already with stable jobs. We don't need <i>more <span className="angry-text">stuff!</span></i>
          </p>
          
          <p className="sub-message">
            We have a house full of everything we need. Your presence at our celebration 
            is the greatest gift we could ask for. If you'd still like to give something, 
            we'd be grateful for contributions toward our future adventures together.
          </p>
          
          <div className="bottom-section">
            <div className="heart-icon">❤️</div>
            <p className="fine-print">
              (Seriously though, no pressure. We mean it. Just come have fun with us! <span 
                className="clickable-party-emoji"
                onClick={handlePartyClick}
                title="Click me!"
              >
                🎉
              </span>)
            </p>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="floating-emoji emoji-1">💍</div>
        <div 
          className="floating-emoji emoji-2 clickable-popper" 
          onClick={handlePopperClick}
          title="Click me!"
        >
          🎊
        </div>
        <div className="floating-emoji emoji-3">🥂</div>
        <div className="floating-emoji emoji-4">💐</div>

        {/* Confetti pieces */}
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="confetti"
            style={{
              left: `${piece.x}px`,
              top: `${piece.y}px`,
              '--random-x': piece.randomX,
              '--random-y': piece.randomY,
              '--duration': `${piece.duration}s`,
              '--color-index': piece.color,
              animationDuration: `${piece.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default WeddingRegistry;
