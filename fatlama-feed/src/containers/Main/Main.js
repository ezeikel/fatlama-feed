import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../containers/Home/Home';
import Feed from '../../components/Feed/Feed';
import Transactions from '../../components/Transactions/Transactions';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/feed' component={Feed} />
      <Route exact path="/transactions" component={Transactions} />
    </Switch>
  </main>
);

export default Main;