import React from 'react';
//
// Note the different ways to execute condional rendering the the jsx
// https://reactjs.org/docs/conditional-rendering.html
//
// thoughts array
const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&//if thoughtd exists, thoughts.map(). 
        thoughts.map(thought => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{' '}
                {thought.reactionCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

//{thought.reactionCount ? 'see' : 'start'} if reactionCount exists, return 'see', else return 'start'
export default ThoughtList;