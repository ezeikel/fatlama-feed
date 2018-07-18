import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <React.Fragment>
    <div>Home works!</div>
    <ul>
      <li><NavLink to="/feed">Feed</NavLink></li>
      <li><NavLink to="/transactions">Transactions</NavLink></li>
    </ul>
  </React.Fragment>
);

export default Home;