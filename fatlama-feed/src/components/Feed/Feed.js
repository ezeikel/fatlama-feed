import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Spinner from '../../containers/Spinner/Spinner';
import FeedHeader from '../../containers/FeedHeader/FeedHeader';
import FeedList from '../../containers/FeedList/FeedList';
import FeedItem from '../../containers/FeedItem/FeedItem';
import PaginationControls from '../../containers/PaginationControls/PaginationControls';

const FeedWrapper = styled.section `
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-medium);
`;

const Error = styled.div `
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background-color: var(--color-red);
  color: var(--color-white);
`;


class Feed extends Component {
  state = {
    page: 1,
    totalPages: 0,
    transactions: {},
    orderBy: 'status',
    loading: true
  };

  componentDidMount() {
    this.fetchData().then(() => {
      this.sortFeed(this.state.orderBy);
      this.setState({
        loading: false
      });
    });
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

  sortFeed = (value) => {
    this.setState(prevState => {
      // no transactions
      if (prevState.totalPages === 0) {
        // go get some data!
        return this.fetchData();
      }

      const sortByStatus = (a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      }

      const sortByDate = (a, b) => {
        return new Date(b.fromDate) - new Date(a.fromDate);
      }

      console.log({ prevState });

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

  handleChange = (e) => {
    const { value } = e.target;

    this.sortFeed(value);
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

  renderFeed = () => {
    const { page, transactions } =  this.state;
    if (transactions[page]) {
      return transactions[page].map((transaction,i) => (
        <FeedItem index={i} key={transaction.id} transaction={transaction} />
      ));
    } else {
      return <li>No transactions.</li>
    }
  }

  render() {
    const { page, totalPages, orderBy, loading } =  this.state;

    if (loading) {
      return <Spinner />
    }

    if (totalPages === 0) {
      return <Error><h1>Unabled to fetch Transactions. Please refresh page.</h1></Error>;
    }

    return (
      <React.Fragment>
        <h1>Transaction Feed</h1>
        <PaginationControls previous={this.handlePreviousClick} next={this.handleNextClick} changeOrder={this.handleChange} page={page} totalPages={totalPages} createSelectItems={this.createSelectItems} orderBy={orderBy} />
        <FeedWrapper>
          <FeedHeader />
          <FeedList render={this.renderFeed} />
        </FeedWrapper>
      </React.Fragment>
    )
  }
};

export default Feed;