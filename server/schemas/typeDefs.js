// Import the gql tagged tamplate function
const { gql } = require('apollo-server-express');

// Create our typeDefs
const typeDefs = gql`
    # Type Definition
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    },

    # Type Reaction
    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    },

    # Type User
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    },

    # Query
    type Query {
        users: [User]
        user(username:  String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    },
`;

// Export for External
module.exports = typeDefs;