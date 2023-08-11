import React, { useState } from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  Bars,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Nav>
        <Bars className="navbar-toggle" onClick={toggleMenu} />
        <NavMenu isOpen={isOpen} className={isOpen ? 'active' : ''}>
          <NavLink to='/' className="nav-brand">
            STAR WARS
          </NavLink>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/planets'>
            Planets
          </NavLink>
          <NavLink to='/spaceships'>
            Spaceships
          </NavLink>
          <NavLink to='/people'>
            People
          </NavLink>
          <NavLink to='/vehicle'>
            Vehicle
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
