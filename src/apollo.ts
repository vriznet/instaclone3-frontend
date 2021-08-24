import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
} from '@apollo/client';

const TOKEN = 'token';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};
export const darkModeVar = makeVar(false);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});
