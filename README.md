# 21-MERN [heroku](https://intense-river-91779.herokuapp.com/)
## Summary 
- Explain the difference between GraphQL and RESTful APIs.</br>
- Configure a proxy server for local development of a MERN application.</br>
- Implement client-side routing using React Router.</br>
- Build API endpoints with GraphQL in a MERN application.</br>
- Successfully configure and deploy a MERN application to Heroku.</br>
- Implement authentication with JWT.</br>

Hosted on : localhost:3001/graphql

## Concepts
With RESTful APIs, CRUD operations are implemented by HTTP verbs (GET, POST, PUT, DELETE). In GraphQL, these operations are split between:

- Queries - perform GET requests and ask for data from a GraphQL API</br>
- Mutations - perform POST, PUT, DELETE requests to manipulate data from GraphQL API 

##### To setup a GraphQL API, two important things must be defined, which together form a schema:
- Type Definitions - GraphQL API allows for the literal defining of every piece of data the client expects to do CRUD operations on. Effectively, not only are we defining the API endpoint but also we are defining the exact data and parameters associated with that endpoint

- Resolvers - the functions connected to each query or mutation type definition, in order to perform the CRUD operations


### Tech Used
- MongoDB</br>
- Express.js</br>
- React</br>
- Node.js</br>



- GraphQL is a query language for APIs and a runtime for fulfilling queries with your existing data, giving clients the power to ask for exactly what they need and nothing more. For this module’s application, you’ll use the graphql package to parse GraphQL syntax in both your front-end and back-end codebase.

- GraphQL playgroud: npm run watch, then go to localhost:3001/graphql

- Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client, the client you’ll use in your MERN application. You’ll use the apollo-server-express package to integrate GraphQL into your Express.js server, and the @apollo/client package to make requests from your React front end to the GraphQL API.

- React Router is a collection of navigational components that compose declaratively with your application, allowing you to make your single-page React applications behave more like multi-page applications. You’ll use the react-router-dom npm package to work with React Router in your applications.

- The concurrently npm package allows you to run multiple processes, or servers, from a single command-line interface. Rather than opening multiple terminals to start the multiple servers, you can run them both at the same time. It also allows you to keep track of different outputs in one place, and will stop all of your processes if even one of them fails.

- JSON Web Tokens, or JWTs, are an alternative to using session cookies for authentication. You’ll use the jsonwebtoken package in your MERN applications. Tokens can be included with a request as part of the body, in the query string (?token=abc), or as an HTTP header(best practice)

- jwt-decode is an npm package that helps decode JWTs from their Base64Url encoding. You’ll use it to extract non-sensitive data such as the token’s expiration date to see if it’s expired before making a request to the server.

- The faker npm package allows you to generate massive amounts of fake data in the development environment of your Node.js applications.

- The nodemon package simplifies your development environment by automatically restarting your Node.js applications when file changes in the directory are detected.


### Lesson Goals
- Integrated the Apollo Server GraphQL library to handle data requests to our API.
- Built both query type definitions and resolvers for retrieving data from our MongoDB database.
- Used the GraphQL Playground interface to thoroughly test our GraphQL queries.
 
- Writing GraphQL type definitions and resolvers.
- Perform create and update operations with GraphQL mutations.
- Implement JSON Web Tokens for authentication.

- Implement the tools to manage the full-stack MERN application for both production and development environments.
- Organize and lay out the client-side React application files.
- Use the Apollo Client library to consume the GraphQL API to display thought data.

- Creating more React components
- Implementing additional client-side GraphQL queries
- Use React Router to tie a component to a URL route.
- Use URL parameters with React Router.
- Add variables to a useQuery Hook.

- Set up front-end functionality to create and log in a user using mutations.
- Implement a front-end authentication service to help manage a user’s logged-in status.
- Contextualize the app to a logged-in user.
- Set up queries to display the logged-in user’s data on pages.

- Use the useMutation Hook in React.
- Build React components that use form elements.
- Manually update the Apollo Client cache.
- Deploy a MERN app to Heroku.


#### Usage
npm run watch, then go to http://localhost:3001/graphql