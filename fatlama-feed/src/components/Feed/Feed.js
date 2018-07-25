import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Spinner from '../../containers/Spinner/Spinner';
import FeedItem from '../../containers/FeedItem/FeedItem';

const FeedControls = styled.section`
  width: 25%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  grid-column-gap: var(--spacing-medium);
`;

const PreviousButton = styled.button`
  font-size: 22px;
  background-color: var(--color-primary);
  color: var(--color-white);
  opacity: ${props => props.disabled ? '0.5' : 'initial'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  grid-column: 1 / span 1;
  grid-row: 1 / 1;
`;

const NextButton = styled.button`
  font-size: 22px;
  background-color: var(--color-primary);
  color: var(--color-white);
  opacity: ${props => props.disabled ? '0.5' : 'initial'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  grid-column: 3 / span 1;
  grid-row: 1 / 1;
`;

const PageNumber = styled.span`
  grid-column: 2 / span 1;
  grid-row: 1 / 1;
  font-size: 32px;
  font-weight: bold;
`;

const OrderBy = styled.select`
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  text-transform: capitalize;
`;

const FeedWrapper = styled.section `
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-medium);
`;

const FeedHeader = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: var(--spacing-small);
  place-items: center;
`;

const FeedHeaderTitle = styled.div `
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  padding: var(--spacing-small);
`;

const FeedList = styled.ul `
  display: grid;
  grid-row-gap: var(--spacing-small);
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
      if (!prevState) return;

      const sortByStatus = (a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      }

      const sortByDate = (a, b) => {
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

    return (
      <React.Fragment>
        <h1>Transaction Feed</h1>
        <FeedControls>
          <PreviousButton disabled={page === 1} onClick={this.handlePreviousClick}>Previous</PreviousButton>
          <PageNumber>{page}/{totalPages}</PageNumber>
          <NextButton disabled={page === totalPages} page={page} onClick={this.handleNextClick}>Next</NextButton>
          <OrderBy value={orderBy} onChange={this.handleChange}>
            {this.createSelectItems()}
          </OrderBy>
        </FeedControls>
        <FeedWrapper>
          <FeedHeader>
            <FeedHeaderTitle>ID</FeedHeaderTitle>
            <FeedHeaderTitle>Status</FeedHeaderTitle>
            <FeedHeaderTitle>From</FeedHeaderTitle>
          </FeedHeader>
          <FeedList>
            {this.renderFeed()}
          </FeedList>
        </FeedWrapper>
      </React.Fragment>
    )
  }
};

export default Feed;