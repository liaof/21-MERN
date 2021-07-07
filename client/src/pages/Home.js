import React from 'react';
// useQuery lets us make requests to the GraphQL server using <ApolloProvider> componenet in App.js
import { useQuery } from '@apollo/client';
// this is a query we created
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);// loading property is from Apollo's @apollo/client library
                                                     // because executing a query is an asynchronous action

                                                     // if there is data returned from the server, store it in the destructured 'data' property

  // 
  const thoughts = data?.thoughts || [];// optional chaining; means if data existss store it in thoughts, if it's undefined store an empty array in thoughts
  console.log(thoughts);

  // if the query hasn't been completed and loading is still defined, we display 'Loading..'
  // when the query is complete and loading is undefined, pass thoughts[] and a title to <ThoughtList> 
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
