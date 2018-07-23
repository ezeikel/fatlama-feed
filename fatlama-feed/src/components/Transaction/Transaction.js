import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const STATUS_CODES = [
  'ESCROW',
  'FL_APPROVED',
  'PAID',
  'PRE_AUTHORIZED',
  'PRE_AUTHORIZED_CANCELLED',
  'QUARANTINED'
];

const URL = 'http://localhost:8080';

const TransactionInfoWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const TransactionHeading = styled.section`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  font-size: 32px;
  font-weight: bold;
`;

const RentalInfoData = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const RentalStatusTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const RentalStartDateTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const RentalEndDateTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const TransactionInfoValue = styled.div`
  padding: var(--spacing-medium);
  border: 1px solid #ecf0f1;
  display: grid;
  align-items: center;
`;

const TransactionInfoImageValue = styled.div`
  padding: var(--spacing-medium);
  border: 1px solid #ecf0f1;
  display: grid;
  place-items: center;
  img {
    max-height: 50px;
  }
`;

const PaymentInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const PromoCodeTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const CreditUsedTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const TotalDiscountTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const TotalPriceTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 4 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const UserIdTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserProfileImageTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserFirstNameTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserLastNameTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 4 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserTelephoneTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 5 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserCreditTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 6 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserEmailTitle = styled.div`
  grid-row: 1 / 2;
  grid-column: 7 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

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
      const { status, data } = response;

      if (status === 200) {
        console.log(`Updated Transaction({${response.id}}) successfully ✅`);
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

  renderUser = (id, user) => {
    if (id && user) {
      return (
        <React.Fragment>
          <UserIdTitle>ID</UserIdTitle>
          <UserProfileImageTitle>Avatar</UserProfileImageTitle>
          <UserFirstNameTitle>Firstname</UserFirstNameTitle>
          <UserLastNameTitle>Lastname</UserLastNameTitle>
          <UserTelephoneTitle>Telephone</UserTelephoneTitle>
          <UserCreditTitle>Credit</UserCreditTitle>
          <UserEmailTitle>Email</UserEmailTitle>
          <TransactionInfoValue>{id}</TransactionInfoValue>
          <TransactionInfoImageValue>
            <img src={user.profileImgUrl} alt="profile" />
          </TransactionInfoImageValue>
          <TransactionInfoValue>{user.firstName}</TransactionInfoValue>
          <TransactionInfoValue>{user.lastName}</TransactionInfoValue>
          <TransactionInfoValue>{user.telephone}</TransactionInfoValue>
          <TransactionInfoValue>{Number(user.credit / 100).toFixed(2)} <span>({this.state.transaction.currency})</span></TransactionInfoValue>
          <TransactionInfoValue>{user.email}</TransactionInfoValue>
        </React.Fragment>
      );
    }
  }

  render() {
    const { transaction, borrower, lender } =  this.state;
    return (
      <React.Fragment>
        <h1>Transaction ({transaction.id})</h1>
        <TransactionInfoWrapper>
          <TransactionHeading>Rental</TransactionHeading>
          <RentalInfoData>
            <RentalStatusTitle>Status</RentalStatusTitle>
            <RentalStartDateTitle>Start date</RentalStartDateTitle>
            <RentalEndDateTitle>End date</RentalEndDateTitle>
            <TransactionInfoValue>{transaction.status}</TransactionInfoValue>
            <TransactionInfoValue>{new Date(transaction.fromDate).toLocaleDateString()}</TransactionInfoValue>
            <TransactionInfoValue>{new Date(transaction.toDate).toLocaleDateString()}</TransactionInfoValue>
          </RentalInfoData>
        </TransactionInfoWrapper>
        <TransactionInfoWrapper>
          <TransactionHeading>Payment</TransactionHeading>
          <PaymentInfo>
            <PromoCodeTitle>Promo code</PromoCodeTitle>
            <CreditUsedTitle>Credit used</CreditUsedTitle>
            <TotalDiscountTitle>Total discount</TotalDiscountTitle>
            <TotalPriceTitle>Total price</TotalPriceTitle>
            <TransactionInfoValue>{transaction.promocode === null ? 'None.' : transaction.promocode}</TransactionInfoValue>
            <TransactionInfoValue>{Number(transaction.creditUsed / 100).toFixed(2)} <span>({transaction.currency})</span></TransactionInfoValue>
            <TransactionInfoValue>{Number(transaction.totalDiscount / 100).toFixed(2)} <span>({transaction.currency})</span></TransactionInfoValue>
            <TransactionInfoValue>{Number(transaction.price / 100).toFixed(2)} <span>({transaction.currency})</span></TransactionInfoValue>
          </PaymentInfo>
        </TransactionInfoWrapper>
        <TransactionInfoWrapper>
          <TransactionHeading>Lender</TransactionHeading>
          <UserInfo>
            {this.renderUser(transaction.lenderId, lender)}
          </UserInfo>
        </TransactionInfoWrapper>
        <TransactionInfoWrapper>
          <TransactionHeading>Borrower</TransactionHeading>
          <UserInfo>
            {this.renderUser(transaction.borrowerId, borrower)}
          </UserInfo>
        </TransactionInfoWrapper>
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