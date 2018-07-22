import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Feed extends Component {
  state = {
    page: 1,
    totalPages: 0,
    transactions: {},
    orderBy: ''
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

  createSelectItems = () => {
    const orderValues = ['recent', 'status'];
    let items = [];

    orderValues.forEach(value => {
      items.push(
        <option key={value} value={value}>{value}</option>
      )
    });

    return items;
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState(prevState => {
      const sortByStatus = (a,b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      }

      const sortByDate = (a,b) => {
        return new Date(b.fromDate) - new Date(a.fromDate);
      }

      const transactions = [...prevState.transactions[prevState.page]];
      
      transactions.sort(value === 'status' ? sortByStatus : sortByDate);

      return {
        orderBy: value,
        transactions: {
          ...prevState.transactions,
          [prevState.page]: transactions
        }
      }
    });
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
          <span>fromDate: {new Date(transaction.fromDate).toLocaleDateString()}</span>
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
        <select value={this.state.orderBy} onChange={this.handleChange}>
          <option value="">Select a vaule to sort by</option>
          {this.createSelectItems()}
        </select>
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