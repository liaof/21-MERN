import React from 'react';
// Redirect allows the user to redirect to another route within the application, like location.replace() but it doesn't reload the browser
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();// get $username from url and call it userParam

  // if userParam!=null, use that value to run QUERY_USER, else run QUERY_ME
  // destructure loading and data objects from the return
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }//username property of variables object = value from line9, aka query for a user with the username from the url
  });
  
  // QUERY_ME returns a me object, QUERY_USER returns a user object, so we set the user const used in the JSX to handle both
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if profile/username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if we are not logged in, we cannot see the profile page
  if (!user?.username) {// alternate method of seeing if there is a user logged in
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        {/* note if we are logged in, and we go to our own profile, the URL gets redirected which means userParam=null */}
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          {/** note how we pass the props */}
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          {/** note how we pass the props */}
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
