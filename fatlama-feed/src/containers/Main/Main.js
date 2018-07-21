import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import Transaction from '../../components/Transaction/Transaction';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Feed} />
      <Route path='/feed' component={Feed} />
      <Route path="/transaction/:id" component={Transaction} />
    </Switch>
  </main>
);

export default Main;