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
import PageTitle from '../components/PageTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '../components/auth/FormError';
import { loginInputs } from '../types/input';
import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../apollo';

const validationSchema = yup.object().shape({
  username: yup.string().required().min(5),
  password: yup.string().required().min(5),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
  } = useForm<loginInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const LOGIN_MUTATION = gql`
    mutation ($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        ok
        token
        error
      }
    }
  `;

  const onCompleted = ({ login: { ok, error, token } }: any) => {
    if (!ok) {
      if (error.includes('User not found')) {
        return setError('username', { message: error });
      } else if (error.includes('Incorrect Password')) {
        return setError('password', { message: error });
      }
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit: SubmitHandler<loginInputs> = () => {
    if (loading) return;
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <AuthContainer>
      <PageTitle title="Log in | Instaclone" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </HeaderContainer>
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Input
              {...register('username')}
              type="text"
              placeholder="Username"
              hasError={Boolean(errors?.username?.message)}
            />
            <FormError message={errors.username?.message} />
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              hasError={Boolean(errors?.password?.message)}
            />
            <FormError message={errors.password?.message} />
          </fieldset>
          <Button
            type="submit"
            value={loading ? 'loading' : 'Log In'}
            disabled={!isValid || loading}
          />
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
