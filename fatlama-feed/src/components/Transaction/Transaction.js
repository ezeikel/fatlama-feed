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
    updatedStatus: ''
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.fetchData(params.id);
  }

  fetchData(id) {
    axios.get(`${URL}/transaction/${id}`)
      .then(response => {
        this.setState({
          transaction: response.data
        });
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

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.transaction.id}</h1>
        <h3>{this.state.transaction.status}</h3>
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