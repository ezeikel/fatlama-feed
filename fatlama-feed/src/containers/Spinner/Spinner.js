import React from 'react';
import styled from 'styled-components';

import spinnerIcon from '../../assets/icons/spinner.svg';

const SpinnerIcon = styled.div `
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-image: url(${spinnerIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100px;
`;

const Spinner = () => (
  <SpinnerIcon />
);

export default Spinner;