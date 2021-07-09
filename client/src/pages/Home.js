import React from 'react';
// useQuery lets us make requests to the GraphQL server using <ApolloProvider> componenet in App.js
import { useQuery } from '@apollo/client';

// this is a query we created
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);// loading property is from Apollo's @apollo/client library
                                                     // because executing a query is an asynchronous action

                                                     // if there is data returned from the server, store it in the destructured 'data' property

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];// optional chaining; means if data existss store it in thoughts, if it's undefined store an empty array in thoughts
  console.log(thoughts);

  // if the query hasn't been completed and loading is still defined, we display 'Loading..'
  // when the query is complete and loading is undefined, pass thoughts[] and a title to <ThoughtList> 
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {/*if we are loggedIn and a successful query for user data was made, display <FriendList>. If not render nothing */}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            {/** note how we pass the props */}
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
