// import the gql tagged template function
// tagged templates are an advanced implementation of template literals
const { gql } = require('apollo-server-express');

// create our typeDefs
// type Query {                 This code creates a query named helloWorld 
//    helloWorld: String        which returns a string
//}                         

// when we go to query for thoughts, we must write
// query {
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
// }

// type Query {                                    this allows us to search for a Thought
//    thoughts(username: String): [Thought]        by username
// }

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        addReaction(thoughtId: ID!, reactionBody: String!): Thought
        addFriend(friendId: ID!): User
    }
    type Auth {
        token: ID!
        user: User
    }
`;// exclaimation marks after the parameter data types means we MUST pass that parameter, 
//else Apollo wil short circuit and return an error without making a request

// export the typeDefs
module.exports = typeDefs;