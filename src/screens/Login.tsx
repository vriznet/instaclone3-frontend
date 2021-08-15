import { Dispatch, SetStateAction } from 'react';
interface ILoginProp {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ isLoggedIn, setIsLoggedIn }: ILoginProp) => (
  <h1 onClick={() => setIsLoggedIn(true)}>Login {isLoggedIn.toString()}</h1>
);
export default Login;
