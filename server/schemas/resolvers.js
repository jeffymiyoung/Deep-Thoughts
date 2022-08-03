// Imports
const { User, Thought } = require('../models');

// Create our Query Resolvers
const resolvers = {
    Query: {
        // All Thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },

        // Singular Thought by ID
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        // All Users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        // Singular User by Username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    }
};

// Export for External
module.exports = resolvers;