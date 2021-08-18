import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import routes from '../routes';
import AuthContainer from '../components/auth/AuthContainer';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Seperator from '../components/auth/Seperator';
import BottomBox from '../components/auth/BottomBox';
import styled from 'styled-components';
import HeaderContainer from '../components/auth/HeaderContainer';
import { FatText } from '../components/shared';
import FacebookLoginBtn from '../components/auth/FacebookLoginBtn';
import AuthForm from '../components/auth/AuthForm';
import PageTitle from '../components/PageTitle';

const SubTitle = styled.h3`
  margin-top: 12px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  width: 90%;
`;

const SignUp = () => {
  return (
    <AuthContainer>
      <PageTitle title="Sign up | Instaclone" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>
            <FatText>
              Sign up to see photos and videos from your friends
            </FatText>
          </SubTitle>
        </HeaderContainer>
        <FacebookLoginBtn />
        <Seperator />
        <AuthForm>
          <fieldset>
            <Input type="text" placeholder="Email" />
            <Input type="text" placeholder="Full Name" />
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
          </fieldset>
          <Button type="submit" value="Sign up" />
        </AuthForm>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthContainer>
  );
};

export default SignUp;
