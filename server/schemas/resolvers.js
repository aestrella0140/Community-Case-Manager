const { User, Case, Note, ProgressEntry } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

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

    notes: async (parent, { userId }) => {
      return Note.find({ author: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password, role }) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addCase: async (
      parent,
      { firstName, lastName, dob, assignedTo, status }
    ) => {
      const newCase = await Case.create({
        firstName,
        lastName,
        dob,
        assignedTo,
        status,
      });

      awaitUser.findByIdAndUpdate(assignedTo, {
        $push: { cases: newCase._id },
      });
      return newCase;
    },

    addNote: async (parent, { content, authorId, caseId }) => {
      const note = await Note.create({
        content,
        author: authorId,
        case: caseId,
      });

      await Case.findByIdAndUpdate(caseId, {
        $push: { notes: note._id },
      });

      return note;
    },

    addProgressEntry: async (
      parent,
      { title, description, date, status, case: caseId, createdBy }
    ) => {
      const entry = await ProgressEntry.create({
        title,
        description,
        date,
        status,
        case: caseId,
        createdBy,
      });
    },
  },
};
