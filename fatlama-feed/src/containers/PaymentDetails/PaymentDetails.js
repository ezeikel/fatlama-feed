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

const PaymentInfo = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const PromoCodeTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 1 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const CreditUsedTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 2 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const TotalDiscountTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 3 / span 1;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  background-color: var(--color-primary);
  color: var(--color-white);
`;

const TotalPriceTitle = styled.div `
  grid-row: 1 / 2;
  grid-column: 4 / span 1;
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

const PaymentDetails = ({ transaction }) => (
      <TransactionInfoWrapper>
        <TransactionHeading>Payment</TransactionHeading>
        <PaymentInfo>
          <PromoCodeTitle>Promo code</PromoCodeTitle>
          <CreditUsedTitle>Credit used</CreditUsedTitle>
          <TotalDiscountTitle>Total discount</TotalDiscountTitle>
          <TotalPriceTitle>Total price</TotalPriceTitle>
          <TransactionInfoValue>{transaction.promocode === null ? 'None.' : transaction.promocode}</TransactionInfoValue>
          <TransactionInfoValue>{Number(transaction.creditUsed / 100).toFixed(2)} ({transaction.currency})</TransactionInfoValue>
          <TransactionInfoValue>{Number(transaction.totalDiscount / 100).toFixed(2)} ({transaction.currency})</TransactionInfoValue>
          <TransactionInfoValue>{Number(transaction.price / 100).toFixed(2)} ({transaction.currency})</TransactionInfoValue>
        </PaymentInfo>
      </TransactionInfoWrapper>
);

export default PaymentDetails;