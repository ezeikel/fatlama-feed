import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Feed extends Component {
  state = {
    page: 1,
    totalPages: 0,
    transactions: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let morePages = true;
    let index = 0;
    const url = 'http://localhost:8080';

    while(morePages) {
      let response;
      try {
        response = await axios.get(`${url}/transactions/${index}`);
      } catch(error) {
        morePages = false;
        this.setState({
          totalPages: index
        });
        return;
      }

      this.setState({
        transactions: {
          ...this.state.transactions,
          [index + 1]: response.data
        }
      });

      index++;
    }
  }

  handleNextClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      }
    });
  }

  handlePreviousClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page - 1,
      }
    });
  }

  renderTransactions = () => {
    if (this.state.transactions[this.state.page]) {
      return this.state.transactions[this.state.page].map(transaction => (
        <li key={transaction.id}>
          <span>id: {transaction.id}</span>
          <span>status: {transaction.status}</span>
          <Link to={`/transaction/${transaction.id}`}>View</Link>
        </li>
      ))
    } else {
      return <li>No transactions</li>
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Page: {this.state.page}</h1>
        <h4>Total Pages: {this.state.totalPages}</h4>
        <ul>
          {this.renderTransactions()}
        </ul>
        { this.state.page !== 1 ? <button onClick={this.handlePreviousClick}>Previous</button> : null }
        { this.state.page !== this.state.totalPages ? <button onClick={this.handleNextClick}>Next</button> : null }        
      </React.Fragment>
    )
  }
};

export default Feed;