import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// Apollo Provider a React componenet that will provide data to all other components
// ApolloClient is a constructor function which is used to initalize the connection to the GraphQL API server
// InMemoryCache enables the ApolloClien to fache API response data
// createHttpLink lets us control how the Apollo Client makes a request. It's like middleware for outbound network reqests.

import Home from './pages/Home';

// create a new llink to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// instantiate the Apollo Client instance, and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instanctiate a new cache object
  cache: new InMemoryCache(),
});

function App() {
  return (
    // we wrap the JSXX with ApolloProvider because we are passing in the client variable, ?
    // components inside ApolloProvider tags will have access to the server's API data via the client variable?
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
