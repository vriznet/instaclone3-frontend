import styled from 'styled-components';
import { defaultProps } from '../types/react-component';
import Header from './Header';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }: defaultProps) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
