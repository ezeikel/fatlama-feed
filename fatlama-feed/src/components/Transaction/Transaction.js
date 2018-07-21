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

class Transaction extends Component {
  state = {
    transaction: {},
    updatedStatus: ''
  }

  componentDidMount() {
    const url = 'http://localhost:8080';
    const { match: { params } } = this.props;

    axios.get(`${url}/transaction/${params.id}`)
      .then(response => {
        this.setState({
          transaction: response.data
        });
      });
  }

  createSelectItems = () => {
    let items = [];
    const status = this.state.transaction.status;

    STATUS_CODES.forEach(code => {
      const selected = status === code;
      items.push(
        <option selected={selected} key={code} value={code}>{code}</option>
      )
    });
    return items;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.transaction.id}</h1>
        <h3>{this.state.transaction.status}</h3>
        <h2>Change Status</h2>
        <form onSubmit={this.handleSubmit}>
          <select>
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