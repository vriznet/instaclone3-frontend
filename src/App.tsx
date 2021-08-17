import { useReactiveVar } from '@apollo/client';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import SignUp from './screens/SignUp';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          {!isLoggedIn ? (
            <Route path="/sign-up">
              <SignUp />
            </Route>
          ) : null}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
