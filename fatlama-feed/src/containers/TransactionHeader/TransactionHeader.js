import React from 'react';
import styled from 'styled-components';

import { flashKeyframe } from '../../globalStyles';

const Header = styled.header `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-row-gap: var(--spacing-large);
  h2 {
    margin: 0;
  }
`;

const PageTitle = styled.h1 `
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: grid;
  place-items: center;
  margin: 0;
`;

const UpdateStatus = styled.form `
  overflow-x: hidden;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--spacing-medium);
  select {
    grid-column: 1 / span 1;
  }
  input[type="submit"] {
    grid-column: 2 / span 1;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    font-weight: bold;
    cursor: pointer;
  }
  input[type="submit"]:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
  input[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormMessage = styled.span `
  grid-column: 3 / -1;
  display: grid;
  place-items: center;
  background-color: ${props => props.error ? 'var(--color-red)' : 'var(--color-green)'};
  color: var(--color-white);
  opacity: 0
  animation: ${props => props.submitted ? flashKeyframe : 'none'} 3s ease-in-out;
`;

const TransactionHeader = ({ transaction, submitted, error, handleSubmit, handleChange, createSelectItems, updatedStatus}) => (
<Header>
  <PageTitle>Transaction ({transaction.id})</PageTitle>
  <h2>Update Status</h2>
  <UpdateStatus onSubmit={handleSubmit}>
    <select value={updatedStatus} onChange={handleChange}>
      {createSelectItems(transaction.status)}
    </select>
    <input disabled={transaction.status === updatedStatus} type="submit" value="Submit" />
    <FormMessage submitted={submitted} error={error.active && error.type === 'submit'}>{error.active && error.type === 'submit' ? error.message : 'Updated status.'}</FormMessage>
  </UpdateStatus>
</Header>
);

export default TransactionHeader;