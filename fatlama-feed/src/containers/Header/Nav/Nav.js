import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../../assets/images/logo-llama.png';

const NavBar = styled.nav `
  display: grid;
  grid-template-columns: 86px auto;
  justify-content: space-between;
  place-items: center;
  padding: var(--spacing-medium) var(--spacing-huge);
  font-size: 18px;
`;

const Logo = styled.img `
  max-height: 100%;
`;

const Nav = () => (
  <NavBar>
    <Logo src={logo} />
    <ul>
      <li><NavLink to="/feed" exact>Feed</NavLink></li>
    </ul>
  </NavBar>
);

export default Nav;