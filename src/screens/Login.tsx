import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import routes from '../routes';
import AuthContainer from '../components/auth/AuthContainer';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Seperator from '../components/auth/Seperator';
import BottomBox from '../components/auth/BottomBox';
import HeaderContainer from '../components/auth/HeaderContainer';
import FacebookLoginBtn from '../components/auth/FacebookLoginBtn';
import AuthForm from '../components/auth/AuthForm';

const Login = () => {
  return (
    <AuthContainer>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </HeaderContainer>
        <AuthForm>
          <fieldset>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
          </fieldset>
          <Button type="submit" value="Log in" />
        </AuthForm>
        <Seperator />
        <FacebookLoginBtn />
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
