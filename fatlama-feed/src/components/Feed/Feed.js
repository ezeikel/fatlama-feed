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
    const url = 'http://localhost:8080/transactions';
    const current = axios.get(`${url}/${this.state.page}`);
    const next = axios.get(`${url}/${this.state.page + 1}`);

    Promise.all([current, next])
      .then(([current, next]) => {
        this.setState((prevState) => {
          return {
            transactions: current.data,
            previous: prevState.page !== 1,
            next: next.data.length > 0
          }
        })
      });
  }

  handleNextClick = () => {
    console.log('Next..');
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      }
    });
  }

  handlePreviousClick = () => {
    console.log('Previous..');
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
    return (
      <React.Fragment>
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