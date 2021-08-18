import { useReactiveVar } from '@apollo/client';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import SignUp from './screens/SignUp';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path={routes.home}>
              {isLoggedIn ? <Home /> : <Login />}
            </Route>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
            ) : null}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
