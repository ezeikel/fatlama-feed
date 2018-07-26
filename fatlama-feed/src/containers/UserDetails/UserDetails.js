import React from 'react';
import styled from 'styled-components';

const UserIdTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 1 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserProfileImageTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 2 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserFirstNameTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 3 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserLastNameTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 4 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserTelephoneTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 5 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserCreditTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 6 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const UserEmailTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 7 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const TransactionInfoValue = styled.div `
  padding: var(--spacing-medium);
  border: var(--border-light);
  display: grid;
  align-items: center;
`;

const TransactionInfoImageValue = styled.div `
  padding: var(--spacing-medium);
  border: var(--border-light);
  display: grid;
  place-items: center;
  img {
    max-height: 50px;
  }
`;

const UserDetails = ({ id, user, currency }) => (
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
      <TransactionInfoValue>{Number(user.credit / 100).toFixed(2)} ({currency})</TransactionInfoValue>
      <TransactionInfoValue>{user.email}</TransactionInfoValue>
    </React.Fragment>
);

export default UserDetails;