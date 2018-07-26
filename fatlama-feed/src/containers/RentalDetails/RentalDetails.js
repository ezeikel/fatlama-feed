import React from 'react';
import styled from 'styled-components';

const TransactionInfoWrapper = styled.div `
  display: grid;
  grid-template-rows: auto 1fr;
`;

const TransactionHeading = styled.section `
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  font-size: 32px;
  font-weight: bold;
`;

const RentalInfoData = styled.section `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const RentalStatusTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 1 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const RentalStartDateTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 2 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const RentalEndDateTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 3 / span 1;
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

const RentalDetails = ({ transaction }) => (
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
);

export default RentalDetails;