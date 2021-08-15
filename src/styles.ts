import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const darkTheme: DefaultTheme = {
  fontColor: 'white',
  bgColor: 'black',
};

export const lightTheme: DefaultTheme = {
  fontColor: 'black',
  bgColor: 'white',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    background-color: ${(props) => props.theme.bgColor}
  }
`;
