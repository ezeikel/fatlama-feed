import React from 'react';
import styled from 'styled-components';

import '../../globalStyes';
import Header from '../../containers/Header/Header';
import Main from '../../containers/Main/Main';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  // padding: var(--spacing-large);
`;

const App = () => (
  <Container>
    <Header />
    <Main />
  </Container>
);

export default App;