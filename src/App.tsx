import { useReactiveVar } from '@apollo/client';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { ThemeProvider } from 'styled-components';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  const darkTheme = {
    fontColor: 'white',
    bgColor: 'black',
  };

  const lightTheme = {
    fontColor: 'black',
    bgColor: 'white',
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
