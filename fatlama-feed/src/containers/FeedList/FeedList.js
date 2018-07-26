import React from 'react';
import styled from 'styled-components';

const List = styled.ul `
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const FeedList = ({ render }) => (
  <List>
    {render()}
  </List>
);

export default FeedList;