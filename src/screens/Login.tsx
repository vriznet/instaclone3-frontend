import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import routes from '../routes';
import AuthContainer from '../components/auth/AuthContainer';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Seperator from '../components/auth/Seperator';
import BottomBox from '../components/auth/BottomBox';

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
    <AuthContainer>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <fieldset>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
          </fieldset>
          <Button type="submit" value="Log in" />
        </form>
        <Seperator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          Log in with Facebook
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthContainer>
  );
};

export default Login;
