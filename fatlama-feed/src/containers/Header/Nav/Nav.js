import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <li><NavLink to="/feed" exact>Feed</NavLink></li>
    </ul>
  </nav>
);

export default Nav;