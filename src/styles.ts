import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const darkTheme: DefaultTheme = {
  blue: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
  bgColor: '#333',
  fontColor: 'white',
};

export const lightTheme: DefaultTheme = {
  blue: '#0095f6',
  borderColor: 'rgb(200, 200, 200)',
  bgColor: '#fafafa',
  fontColor: 'rgb(38, 38, 38)',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.fontColor};
  }
  a {
    text-decoration: none;
  }
`;
