import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--spacing-small);
  align-items: center;
  padding: var(--spacing-small);
  background-color: ${props => props.index % 2 !== 0 ? 'var(--color-primary)' : 'var(--color-white)' };
  color: ${props => props.index % 2 !== 0 ? 'var(--color-white)' : 'var(--color-black)' };
  a {
    color: ${props => props.index % 2 !== 0 ? 'var(--color-white)' : 'var(--color-black)' };
  }
`;

const FeedItem = ({ transaction, index }) => (
  <Wrapper index={index}>
    <span>{transaction.id}</span>
    <span>{transaction.status}</span>
    <span>{new Date(transaction.fromDate).toLocaleDateString()}</span>
    <Link to={`/transaction/${transaction.id}`}>View</Link>
  </Wrapper>
);

export default FeedItem;