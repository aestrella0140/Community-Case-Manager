const { User, Case, Note, ProgressEntry, } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        Users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        Cases: async () => {
            return Case.find();
        },

        case: async (parent, { caseId }) => {
            return Case.findOne({ _id: caseId });
        },

        notes: async (userId) => {
            return Note.find({ _id: userId});
        },
    },

    Mutation: {
        addUser: async (parent, { userId }) => {
            const user = await User.create({firstName, lastName, email, password});
            const token = signToken(user);
        },

        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);
            return { token, user };
        },
    }
}