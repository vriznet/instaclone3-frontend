import styled from 'styled-components';
import { darkModeVar, isLoggedInVar } from '../apollo';

const Container = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const Login = () => {
  return (
    <Container>
      <h1 onClick={() => isLoggedInVar(true)}>Login</h1>
      <button onClick={() => darkModeVar(false)}>Light</button>
      <button onClick={() => darkModeVar(true)}>Dark</button>
    </Container>
  );
};
export default Login;
