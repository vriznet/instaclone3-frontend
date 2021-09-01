import { useHistory } from 'react-router';
import routes from '../routes';
import { logUserOut } from '../apollo';

const Home = () => {
  const history = useHistory();

  const logOutHandler = () => {
    history?.replace(routes.home, null);
    logUserOut();
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logOutHandler()}>Log out now!</button>
    </div>
  );
};

export default Home;
