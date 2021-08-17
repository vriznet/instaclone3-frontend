import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const darkTheme: DefaultTheme = {
  blue: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
  bgColor: '#fafafa',
};

export const lightTheme: DefaultTheme = {
  blue: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
  bgColor: '#fafafa',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: rgb(38, 38, 38);
  }
  a {
    text-decoration: none;
  }
`;
