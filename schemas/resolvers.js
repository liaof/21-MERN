const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// A resolver can accept 4 arguments in following order:

// 1. parent: This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to 
// the resolver that executed the nested resolver function. We won't need this throughout the project, but we need 
// to include it as the first argument.

// 2. args: This is an object of all of the values passed into a query or mutation request as parameters. In the thoughts resolver, 
// we destructure the username parameter out to be used.

// 3. context: This will come into play later. If we were to need the same data to be accessible by all resolvers, 
// such as a logged-in user's status or API access token, this data will come through this context parameter as an object.

// 4. info: This will contain extra information about an operation's current state. This isn't used as frequently, 
// but it can be implemented for more advanced uses.


const resolvers = {
    Query: {
        // get all thoughts resolver
        thoughts: async (parent, { username }) => {
            // the question mark is a ternary operator, and it means
            // if username exists, set params to an object with a username key set to the original username's value, and if it doesn't exist
            // return username as an empty object
            const params = username ? { username } : {};
            // perform lookup by specific username, since we set params.username = username
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // get single thought by thought id resolver
        thought: async (parent, {_id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')// omit password
                .populate('friends')
                .populate('thoughts');
        },
        // get single user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')// omit password
                .populate('friends')
                .populate('thoughts')
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            // sign token and return an object that combines the token, and the user's data
            //const token = signToken(user);
            return user;
            //return { user, token };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            
            return user;
            //const token = signToken(user);
            //return { user, token };
        }
    }
};

module.exports = resolvers;

// full query:
//   query {
//     # get all users
//     users {
//       username
//       email
//     }
  
//     # get a single user by username (use a username from your database)
//     user(username: "<username-goes-here>") {
//       username
//       email
//       friendCount
//       thoughts {
//         thoughtText
//       }
//       friends {
//         username
//       }
//     }
  
//     # query all thoughts
//     thoughts {
//       _id
//       username
//       thoughtText
//       reactions {
//         _id
//         createdAt
//         username
//         reactionBody
//       }
//     }
  
//     # query a single thought (use an _id from a thought in your database)
//     thought(_id: "<thought-id-here>") {
//       _id
//       username
//       thoughtText
//       createdAt
//       reactions {
//         username
//         reactionBody
//       }
//     }
//   }
  