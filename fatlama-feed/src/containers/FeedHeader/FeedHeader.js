import React from 'react';
import styled from 'styled-components';

const Header = styled.header `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: var(--spacing-small);
  place-items: center;
`;

const Title = styled.div `
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  padding: var(--spacing-small);
`;

const FeedHeader = () => (
  <Header>
    <Title>ID</Title>
    <Title>Status</Title>
    <Title>From</Title>
  </Header>
);

export default FeedHeader;