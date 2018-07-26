import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Spinner from '../../containers/Spinner/Spinner';
import TransactionHeader from '../../containers/TransactionHeader/TransactionHeader';
import RentalDetails from '../../containers/RentalDetails/RentalDetails';
import PaymentDetails from '../../containers/PaymentDetails/PaymentDetails';
import LenderDetails from '../../containers/LenderDetails/LenderDetails';
import BorrowerDetails from '../../containers/BorrowerDetails/BorrowerDetails';
import UserDetails from '../../containers/UserDetails/UserDetails';

const STATUS_CODES = [
  'ESCROW',
  'FL_APPROVED',
  'PAID',
  'PRE_AUTHORIZED',
  'PRE_AUTHORIZED_CANCELLED',
  'QUARANTINED',
  'CANCELLED'
];

const URL = 'http://localhost:8080';

const Error = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background-color: var(--color-red);
  color: var(--color-white);
`;

class Transaction extends Component {
  state = {
    transaction: {},
    lender: {},
    borrower: {},
    updatedStatus: '',
    submitted: false,
    loading: true,
    error: {
      active: false,
      message: '',
      type: ''
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.fetchData(params.id);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  fetchData = async (id) => {
    let transaction, lender, borrower;

    try {
      transaction = await axios.get(`${URL}/transaction/${id}`);
      [lender, borrower] = await Promise.all([axios.get(`${URL}/user/${transaction.data.lenderId}`), axios.get(`${URL}/user/${transaction.data.borrowerId}`)]);
    } catch(e) {
      console.log(`There was an error: ${e}`);
      this.setState({
        loading: false,
        error: {
          active: true,
          message: 'Oops, there was an error fetching data. please refresh the page.',
          type: 'fetch'
        }
      });
      return;
    }

    this.setState({
      transaction: transaction.data,
      lender: lender.data,
      borrower: borrower.data,
      updatedStatus: transaction.data.status,
      loading: false
    });
  }

  createSelectItems = () => {
    let items = [];

    STATUS_CODES.forEach(code => {
      items.push(
        <option key={code} value={code}>{code}</option>
      )
    });

    return items;
  }

  handleChange = (e) => {
    this.setState({
      updatedStatus: e.target.value
    });
  }

  resetSubmittedStatus = () => {
  if (this.timeout) {
    clearTimeout(this.timeout);
  }

  this.timeout = setTimeout(() => {
    this.setState({
      submitted: false
    });
  }, 3000);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${URL}/transaction/${this.state.transaction.id}`, {
      status: this.state.updatedStatus
    })
    .then(response => {
      const { status, data } = response;

      if (status === 200) {
        console.log(`Updated Transaction(${data.id}) successfully ✅`);
        this.setState({
          transaction: data,
          updatedStatus: data.status,
          submitted: true
        });

        this.resetSubmittedStatus();
      }

    })
    .catch(error => {
      console.log(`Failed to update transaction with error: ${error}. ⛔️`);
      this.setState({
        submitted: true,
        error: {
          active: true,
          message: 'Oops there was an error updating status. Please try again.',
          type: 'submit'
        }
      });

      this.resetSubmittedStatus();
    });
  }

  renderUser = (id, user) => {
    if (id && user) {
      return (
        <UserDetails id={id} user={user} currency={this.state.transaction.currency} />
      );
    }
  }

  render() {
    const { transaction, borrower, lender, updatedStatus, submitted, loading, error } =  this.state;

    if (loading) {
      return <Spinner />
    }

    if (error.active && error.type === 'fetch') {
      return <Error><h1>{error.message}</h1></Error>
    }

    return (
      <React.Fragment>
        <TransactionHeader transaction={transaction} updatedStatus={updatedStatus} handleSubmit={this.handleSubmit} handleChange={this.handleChange} submitted={submitted} error={error} createSelectItems={this.createSelectItems} />
        <RentalDetails transaction={transaction} />
        <PaymentDetails transaction={transaction} />
        <LenderDetails transaction={transaction} lender={lender} render={this.renderUser} />
        <BorrowerDetails transaction={transaction} borrower={borrower} render={this.renderUser} />
      </React.Fragment>
    );
  }
};

export default Transaction;