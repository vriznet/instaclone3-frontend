import { gql, useMutation } from '@apollo/client';
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
import { useHistory } from 'react-router';

const SubTitle = styled.h3`
  margin-top: 12px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  width: 90%;
`;

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required().min(5),
  lastName: yup.string().required().min(2),
  username: yup.string().required().min(5),
  password: yup.string().required().min(5),
});

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
  } = useForm<signUpInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const CREATE_ACCOUNT_MUTATION = gql`
    mutation (
      $email: String!
      $firstName: String!
      $lastName: String!
      $username: String!
      $password: String!
    ) {
      createAccount(
        email: $email
        firstName: $firstName
        lastName: $lastName
        username: $username
        password: $password
      ) {
        ok
        error
      }
    }
  `;

  const onCompleted = ({ createAccount: { ok, error } }: any) => {
    const { username, password } = getValues();
    if (!ok) {
      if (error === 'Error: username is already taken.') {
        return setError('username', { message: error });
      } else if (error === 'Error: email is already taken.') {
        return setError('email', { message: error });
      } else if (error === 'Error: username email is already taken.') {
        setError('username', { message: 'username is already taken.' });
        setError('email', { message: 'email is already taken.' });
        return;
      }
    }
    history.push(routes.home, {
      message: 'Account created. Please log in.',
      username,
      password,
    });
  };

  const [signUp, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmit: SubmitHandler<signUpInputs> = () => {
    if (loading) return;
    const { email, firstName, lastName, username, password } = getValues();
    signUp({
      variables: {
        email,
        firstName,
        lastName,
        username,
        password,
      },
    });
  };

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
              {...register('firstName')}
              placeholder="First Name"
              hasError={Boolean(errors?.firstName?.message)}
            />
            <FormError message={errors.firstName?.message} />
            <Input
              type="text"
              {...register('lastName')}
              placeholder="Last Name"
              hasError={Boolean(errors?.lastName?.message)}
            />
            <FormError message={errors.lastName?.message} />
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
          <Button
            type="submit"
            value={loading ? 'loading' : 'Sign Up'}
            disabled={!isValid || loading}
          />
        </AuthForm>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthContainer>
  );
};

export default SignUp;
