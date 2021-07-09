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
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');
          
              return userData;
            }
            // if no context.user exists, we know the user isn't authenticated and we can thrown an error
            // if there is a valid token in the http query, then the user is authenticated and the website knows if someone is logged in or not
            throw new AuthenticationError('Not logged in');
        },
        // get all thoughts resolver
        thoughts: async (parent, { username }) => {
            // the question mark is a ternary operator, and it means:
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
            const token = signToken(user);
            return { user, token };
        },
        login: async (parent, { email, password }) => {// module 21.2.3 for login explaination
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addThought: async (parent, args, context) => {
            // only logged in users are able to use this mutation; context.user must exist, and .user is only added to context if the verification passes
            // .user contains the username, email and _id properties 
            if (context.user) {
              // create a thought with a username property equal to that of context.user's
              const thought = await Thought.create({ ...args, username: context.user.username });// ...args = email and _id properties
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { thoughts: thought._id } },
                { new: true }
              );
          
              return thought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: { reactionBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedThought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
          // context = the logged in user adding the friends
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                // addToSet instead of Push prevents adding duplicates, because you can't be friends with the same user twice over
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
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
  