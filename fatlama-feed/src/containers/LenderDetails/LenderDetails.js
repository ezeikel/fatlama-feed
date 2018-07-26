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

const UserInfo = styled.div `
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const LenderDetails = ({ transaction, lender, render}) => (
  <TransactionInfoWrapper>
    <TransactionHeading>Lender</TransactionHeading>
    <UserInfo>
      {render(transaction.lenderId, lender)}
    </UserInfo>
  </TransactionInfoWrapper>
);

export default LenderDetails;