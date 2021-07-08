import React from 'react';
import { Link } from 'react-router-dom';
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
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{' '}
                thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{' '}{/** Reactions: n || Click to see/start the discussion! */}
                  {thought.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

// {`/profile/${thought.username}`} thought.username is the username of the person that made that particular thought
{/* <Link
      to={`/profile/${thought.username}`}             if thought.username = test, this block of code creates title that says
      style={{ fontWeight: 700 }}                     test thought on, with test being a clickable <a> element
      className="text-light"
    >
      {thought.username}
    </Link>{' '}                             this line inserts the space between the test and thought
    thought on {thought.createdAt} */}

//{thought.reactionCount ? 'see' : 'start'} if reactionCount exists, return 'see', else return 'start'
export default ThoughtList;