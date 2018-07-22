import { injectGlobal } from 'styled-components';

export default injectGlobal`
  /* CSS Variables */
  :root {
    /* Colors */
    --color-primary: #78C5BE;
    --color-black: #111111;
    --color-white: #ffffff;
    /* Spacing */
    --spacing-tiny: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
    --spacing-huge: 64px;
    /* Font Sizing */
    --default-font-size: 16px;
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
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="date"],
  input[type="submit"],
  textarea,
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    border: 0;
    border-radius: 0;
    margin-bottom: 15 px;
    padding: 1em;
    border: 1px solid #ecf0f1;
    transition: all 0.3s ease-in-out;
    width: 100% ;
    font-weight: 300;
  }

  input,
  textarea,
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