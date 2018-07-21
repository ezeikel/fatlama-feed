import React, { Component } from 'react';
import axios from 'axios';

class Transaction extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    const url = 'http://localhost:8080';
    const { match: { params } } = this.props;

    axios.get(`${url}/transaction/${params.id}`)
      .then(response => {
        this.setState({
          data: response.data
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.data.id}</h1>
        <h3>{this.state.data.status}</h3>
      </React.Fragment>
    );
  }
};

export default Transaction;