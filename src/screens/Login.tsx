import { isLoggedInVar } from '../apollo';

const Login = () => <h1 onClick={() => isLoggedInVar(true)}>Login</h1>;
export default Login;
