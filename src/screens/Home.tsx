import { isLoggedInVar } from '../apollo';

const Home = () => <h1 onClick={() => isLoggedInVar(false)}>Home</h1>;
export default Home;
