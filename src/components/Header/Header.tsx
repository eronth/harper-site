import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {

  const titles = [
    <>The Nic and Leslie Experience</>,
    <>A Leslie and Nic (LAN) Party</>,
    <>Leslie... and the rest</>,
    <>
      <s>Tom and Kelsey</s>
      <div className='float-text'>Nic and Leslie</div>
    </>,
    <div className="transformative-title">
      <div className='leslie-text'>LESLIE</div>
      <div className='har-text moving-text'>HAR</div>
      <div className='gus-text fading-text'>GUS</div>
      <div className='and-text'>&</div>
      <div className='nic-text'>NIC</div>
      <div className='per-text moving-text'>PER</div>
      <div className='erei-text fading-text'>EIRA</div>
      <div className='harper-text'>HARPER</div>
    </div>,
    <>It's the NIC & LESLIE Show! Starring, Nic... & Leslie!!!</>,
    // <>Les<span style={{fontSize: '0.8em', opacity: 0.7}}>lie</span> & Nic<span style={{fontSize: '0.8em', opacity: 0.7}}>ely</span></>,
    // <>Two Names, One <span style={{fontStyle: 'italic', color: 'var(--brand-maroon-light)'}}>Adventure</span></>,
    // <>
    //   <span style={{transform: 'rotate(-5deg)', display: 'inline-block'}}>L</span>eslie 
    //   <span style={{fontSize: '1.2em', fontWeight: 'bold'}}>&</span> 
    //   <span style={{transform: 'rotate(5deg)', display: 'inline-block'}}>N</span>ic
    // </>,
    // <>The <span style={{textDecoration: 'underline wavy'}}>L&N</span> Chronicles</>,
    // <>Leslie ↔ Nic</>,
    // <>
    //   <span style={{background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
    //     LESLIE
    //   </span> 
    //   {' & '} 
    //   <span style={{background: 'linear-gradient(45deg, #4ecdc4, #ff6b6b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
    //     NIC
    //   </span>
    // </>,
    // <>Les & Nic <span style={{fontSize: '0.7em', verticalAlign: 'super'}}>™</span></>,
    // <>
    //   <span style={{letterSpacing: '0.2em'}}>L•E•S•L•I•E</span> 
    //   {' & '} 
    //   <span style={{letterSpacing: '0.2em'}}>N•I•C</span>
    // </>,
    // <>The Dynamic Duo: <em>Leslie & Nic</em></>,
    // <>
    //   <span style={{fontFamily: 'monospace', background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '3px'}}>
    //     console.log("Leslie & Nic");
    //   </span>
    // </>,
    <>Leslie 🤝 Nic</>,
    // <>
    //   <span style={{fontSize: '1.3em'}}>L</span>eslie{' '}
    //   <span style={{fontSize: '0.8em', opacity: 0.8}}>plus</span>{' '}
    //   <span style={{fontSize: '1.3em'}}>N</span>ic
    // </>,
  ];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  return (
    <header className="header">
      <button className="hamburger-btn" onClick={onMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/" className="header-title-link">
        <h1 className="header-title">{randomTitle}</h1>
      </Link>
    </header>
  );
};

export default Header;
