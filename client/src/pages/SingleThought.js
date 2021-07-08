import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';// query return data structure is determined here

import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  // useParams allows us to save the id from the url as thoughtId
  const { id: thoughtId } = useParams();
  // loading and data are variables destructured from useQuery hook
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }// the id property of the variables object will become the $id parameter in the query(we made thoughtId = the $id from the param on line 7)
                                // aka query for a thought with the thought id from the url
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
            thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

    {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}{/**add the ReactionList componenet, and pass the reactions array as a prop, but only if there are any reactions at all */}
  </div>
  );
};

export default SingleThought;
