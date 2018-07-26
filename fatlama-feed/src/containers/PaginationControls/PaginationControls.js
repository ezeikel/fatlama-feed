import React from 'react';
import styled from 'styled-components';

const ControlsWrapper = styled.section `
  width: 25%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  grid-column-gap: var(--spacing-medium);
`;

const PreviousButton = styled.button `
  font-size: 22px;
  background-color: var(--color-primary);
  color: var(--color-white);
  opacity: ${props => props.disabled ? '0.5' : 'initial'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  grid-column: 1 / span 1;
  grid-row: 1 / 1;
`;

const NextButton = styled.button `
  font-size: 22px;
  background-color: var(--color-primary);
  color: var(--color-white);
  opacity: ${props => props.disabled ? '0.5' : 'initial'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  grid-column: 3 / span 1;
  grid-row: 1 / 1;
`;

const PageNumber = styled.span `
  grid-column: 2 / span 1;
  grid-row: 1 / 1;
  font-size: 32px;
  font-weight: bold;
`;

const OrderBy = styled.select `
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  text-transform: capitalize;
`;

const PaginationControls = ({page, orderBy, totalPages, previous, next, createSelectItems, changeOrder}) => (
  <ControlsWrapper>
    <PreviousButton disabled={page === 1} onClick={previous}>Previous</PreviousButton>
    <PageNumber>{page}/{totalPages}</PageNumber>
    <NextButton disabled={page === totalPages} page={page} onClick={next}>Next</NextButton>
    <OrderBy value={orderBy} onChange={changeOrder}>
      {createSelectItems()}
    </OrderBy>
  </ControlsWrapper>
);

export default PaginationControls;