import { Dispatch, SetStateAction } from 'react';
interface IHomeProp {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}
const Home = ({ isLoggedIn, setIsLoggedIn }: IHomeProp) => (
  <h1 onClick={() => setIsLoggedIn(false)}>Home {isLoggedIn.toString()}</h1>
);
export default Home;
