import React, { Component } from 'react';
import axios from 'axios';

const STATUS_CODES = [
  'ESCROW',
  'FL_APPROVED',
  'PAID',
  'PRE_AUTHORIZED',
  'PRE_AUTHORIZED_CANCELLED',
  'QUARANTINED'
];

const URL = 'http://localhost:8080';

class Transaction extends Component {
  state = {
    transaction: {},
    lender: {},
    borrower: {},
    updatedStatus: ''
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.fetchData(params.id);
  }

  fetchData = async (id) => {
    const transaction = await axios.get(`${URL}/transaction/${id}`);
    const lender = await axios.get(`${URL}/user/${transaction.data.lenderId}`);
    const borrower = await axios.get(`${URL}/user/${transaction.data.borrowerId}`);

    this.setState({
      transaction: transaction.data,
      lender: lender.data,
      borrower: borrower.data
    });
  }

  createSelectItems = () => {
    let items = [];
    const { status } = this.state.transaction;

    STATUS_CODES.filter(code => code !== status).forEach(code => {
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

  handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${URL}/transaction/${this.state.transaction.id}`, {
      status: this.state.updatedStatus
    })
    .then(response => {
      console.log(`Updated Transactions successfully ✅`);
      const { status, data } = response;

      if (status === 200) {
        this.setState({
          transaction: data,
          updatedStatus: ''
        });
      }

    })
    .catch(error => {
      console.log(`Failed to update transaction with error: ${error}.`);
    });
  }

  renderUser = (user) => {
    if (user) {
      return (
        <React.Fragment>
          <img src={user.profileImgUrl} alt="profile" />
          <span><strong>Firstname:</strong> {user.firstName}</span>
          <span><strong>LastName:</strong> {user.lastName}</span>
          <span><strong>Telephone:</strong> {user.telephone}</span>
          <span><strong>Credit:</strong> {user.credit}</span>
          <span><strong>Email:</strong> {user.email}</span>
        </React.Fragment>
      );
    }
  }

  render() {
    const { transaction, borrower, lender } =  this.state;
    return (
      <React.Fragment>
        <h1><strong>ID:</strong> {transaction.id}</h1>
        <h3><strong>Status:</strong> {transaction.status}</h3>
        <span><strong>From:</strong> {new Date(transaction.fromDate).toLocaleDateString()}</span>
        <span><strong>To:</strong> {new Date(transaction.toDate).toLocaleDateString()}</span>
        <span><strong>Promo Code:</strong> {transaction.promocode === null ? 'No promo code used.' : transaction.promocode}</span>
        <span><strong>Credit Used:</strong> {Number(transaction.creditUsed / 100).toFixed(2)} <span>({transaction.currency})</span></span>
        <span><strong>Total Discount:</strong> {Number(transaction.totalDiscount / 100).toFixed(2)} <span>({transaction.currency})</span></span>
        <span><strong>Price:</strong> {Number(transaction.price / 100).toFixed(2)} <span>({transaction.currency})</span></span>
        <h2>Lender</h2>
        {this.renderUser(lender)}
        <span>{transaction.lenderId}</span>
        <h2>Borrower</h2>
        {this.renderUser(borrower)}
        <h2>Change Status</h2>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.updatedStatus} onChange={this.handleChange}>
            <option value="">Select a transaction status</option>
            {this.createSelectItems()}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
};

export default Transaction;