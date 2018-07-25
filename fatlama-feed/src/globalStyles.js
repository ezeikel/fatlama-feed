import { injectGlobal, keyframes } from 'styled-components';

export default injectGlobal`
  /* CSS Variables */
  :root {
    /* Colors */
    --color-primary: #78C5BE;
    --color-black: #111111;
    --color-white: #FFFFFF;
    --color-red: #E74C3C;
    --color-green: #2ECC71;
    --color-light-grey: #ECF0F1;
    /* Spacing */
    --spacing-tiny: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
    --spacing-huge: 64px;
    /* Font Sizing */
    --default-font-size: 16px;

    --border-light: 1px solid var(--color-light-grey);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'proxima-nova', sans-serif;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
  }

  input[type="submit"],
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    border: 0;
    border-radius: 0;
    margin-bottom: 15 px;
    padding: 1em;
    border: var(--border-light);
    transition: all 0.3s ease-in-out;
    width: 100% ;
    font-weight: 300;
  }

  input,
  select,
  label {
    font-size: var(--default-font-size);
  }

  select {
    background-color: var(--color-white);
  }
  input, button, submit {
    border: none;
  }
`;

export const flashKeyframe = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;