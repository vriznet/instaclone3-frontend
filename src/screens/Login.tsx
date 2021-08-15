import styled from 'styled-components';
import { darkModeVar, isLoggedInVar } from '../apollo';

interface IContainerProps {
  floating?: boolean;
}

const Container = styled.div<IContainerProps>`
  margin: 30px 0 0 30px;
  width: 400px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: ${(props) => (props.floating ? '6px 6px 30px 0px;' : 'none')};
`;

const Login = () => {
  return (
    <Container floating>
      <h1 onClick={() => isLoggedInVar(true)}>Login</h1>
      <button onClick={() => darkModeVar(false)}>Light</button>
      <button onClick={() => darkModeVar(true)}>Dark</button>
    </Container>
  );
};
export default Login;
