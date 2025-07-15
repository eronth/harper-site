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
    </div>
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
