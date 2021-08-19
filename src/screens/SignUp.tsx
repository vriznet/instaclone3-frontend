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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpInputs } from '../types/input';
import FormError from '../components/auth/FormError';

const SubTitle = styled.h3`
  margin-top: 12px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  width: 90%;
`;

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  fullName: yup.string().required().min(5),
  username: yup.string().required().min(5),
  password: yup.string().required().min(5),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signUpInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<signUpInputs> = (data) => console.log(data);

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
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Input
              type="text"
              {...register('email')}
              placeholder="Email"
              hasError={Boolean(errors?.email?.message)}
            />
            <FormError message={errors.email?.message} />
            <Input
              type="text"
              {...register('fullName')}
              placeholder="Full Name"
              hasError={Boolean(errors?.fullName?.message)}
            />
            <FormError message={errors.fullName?.message} />
            <Input
              type="text"
              {...register('username')}
              placeholder="Username"
              hasError={Boolean(errors?.username?.message)}
            />
            <FormError message={errors.username?.message} />
            <Input
              type="password"
              {...register('password')}
              placeholder="Password"
              hasError={Boolean(errors?.password?.message)}
            />
            <FormError message={errors.password?.message} />
          </fieldset>
          <Button type="submit" value="Sign up" disabled={!isValid} />
        </AuthForm>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthContainer>
  );
};

export default SignUp;
