import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, from, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/',
  options: {
    reconnect: true,
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (token && refreshToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'x-token': token,
        'x-refresh-token': refreshToken,
      },
    }));
  }

  return forward(operation);
});

const otherMiddeware = new ApolloLink((operation, forward) => forward(operation)
  .map((response) => {
    const { response: { headers } } = operation.getContext();

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token && refreshToken) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  }));

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  from([
    otherMiddeware,
    authMiddleware,
    httpLink,
  ]),
);

const client = new ApolloClient({
  cache,
  link,
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
