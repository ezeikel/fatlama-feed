import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Feed from '../../components/Feed/Feed';
import Transaction from '../../components/Transaction/Transaction';

  // padding: var(--spacing-large);

const Wrapper = styled.div `
  display: grid;
  grid-row-gap: var(--spacing-large);
  padding: var(--spacing-huge);
`;

const Main = () => (
  <Wrapper>
    <Switch>
      <Route exact path='/' component={Feed} />
      <Route path='/feed' component={Feed} />
      <Route path="/transaction/:id" component={Transaction} />
    </Switch>
  </Wrapper>
);

export default Main;