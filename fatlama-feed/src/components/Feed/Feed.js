import React, { Component } from 'react';
import axios from 'axios';

class Feed extends Component {
  state = {
    page: 1,
    previous: false,
    next: false,
    transactions: [],
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.fetchData();
  }

  fetchData = (page = this.state.page) => {
    const url = 'http://localhost:8080/transactions';
    const current = axios.get(`${url}/${page}`);
    const next = axios.get(`${url}/${page + 1}`);

    Promise.all([current, next])
      .then(([current, next]) => {
        console.log('Setting state!');
        this.setState({
          page: page,
          transactions: current.data,
          previous: page !== 1,
          next: next.data.length > 0
        });
      })
      .catch(e => {
        if (e.request.status === 500) {
          this.setState({
            page: page,
            transactions: this.state.transactions,
            previous: page !==1,
            next: false
          })
        }
        debugger;
        console.log('Erroring out!');
        console.log({error: e})
      });
  }

  handleNextClick = () => {
    console.log('Next..');
    this.fetchData(this.state.page + 1);
  }

  handlePreviousClick = () => {
    console.log('Previous..');
    this.fetchData(this.state.page - 1);
  }

  renderTransactions = () => (
    this.state.transactions.map(transaction => (
      <li key={transaction.id}>
        <span>id: {transaction.id}</span>
        <span>status: {transaction.status}</span>
      </li>
    ))
  );

  render() {
    console.log('render()');
    return (
      <React.Fragment>
        <h1>Page: {this.state.page}</h1>
        <ul>
          {this.renderTransactions()}
        </ul>
        { this.state.previous ? <span onClick={this.handlePreviousClick}>Previous</span> : null }
        { this.state.next ? <span onClick={this.handleNextClick}>Next</span> : null }        
      </React.Fragment>
    )
  }
};

export default Feed;