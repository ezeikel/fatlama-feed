import React from 'react';

import styled from 'styled-components';
import Nav from './Nav/Nav';

const Wrapper = styled.header`
  display: grid;
  background-color: var(--color-primary);
  a {
    color: var(--color-white);
  }
`;

const Header = () => (
  <Wrapper>
    <Nav />
  </Wrapper>
);

export default Header;