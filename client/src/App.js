import React from 'react';
// call BrowserRouter as Router for brevity 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// Apollo Provider a React componenet that will provide data to all other components
// ApolloClient is a constructor function which is used to initalize the connection to the GraphQL API server
// InMemoryCache enables the ApolloClien to fache API response data
// createHttpLink lets us control how the Apollo Client makes a request. It's like middleware for outbound network reqests.

// page components
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
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

    // the Router wrap is so the child page componenets will be aware of the client-side routes

    // if we visit a route that hasn't been defined, switch to the NoMatch component
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              {/*render component based on the current url */}
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />{/*the ? means it can render profile/ and profile/username */}
              <Route exact path="/thought/:id" component={SingleThought} />{/*we must have an id after the thought/*/}

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
