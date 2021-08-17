import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    width: 100%;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    fieldset {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0;
  text-align: center;
  a {
    margin-left: 5px;
    font-weight: 700;
    color: ${({ theme }) => theme.blue};
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px 8px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &::placeholder {
    font-size: 12px;
  }
`;

const SubmitButton = styled.input`
  background-color: ${({ theme }) => theme.blue};
  border: none;
  width: 100%;
  color: white;
  padding: 7px 0;
  border-radius: 3px;
  font-weight: 700;
  font-size: 12px;
`;

const Seperator = styled.div`
  margin: 20px 0 30px 0;
  color: rgb(150, 150, 150);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
  font-weight: 600;
  div {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.borderColor};
  }
  span {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 12px;
  }
`;

const FacebookLogin = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  color: #385184;
  svg {
    margin-right: 7px;
  }
  font-size: 13px;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <fieldset>
              <TextInput type="text" placeholder="Username" />
              <TextInput type="password" placeholder="Password" />
            </fieldset>
            <SubmitButton type="submit" value="Log in" />
          </form>
          <Seperator>
            <div></div>
            <span>Or</span>
            <div></div>
          </Seperator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            Log in with Facebook
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>Don't have an account?</span>
          <Link to="/sign-up">Sign up</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};
export default Login;
