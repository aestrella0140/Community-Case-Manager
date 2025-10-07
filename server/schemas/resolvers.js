const { User, Case, Note, ProgressEntry } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllUsers: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to view Users.");
      }

      if (context.user.role !== "admin") {
        throw new AuthenticationError("You are not authorized to view all users.");
      }

      return User.find();
    },

    getUserById: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to view Users.");
      }

      if (context.user.role !== "admin" && context.user._id !== id) {
        throw new AuthenticationError("Not authorized to view this user.")
      }

      return User.findById(id);
    },

    getAllCases: async () => {
      return Case.find();
    },

    getCaseById: async (parent, { caseId }) => {
      return Case.findOne({ _id: caseId });
    },

    getAllNotes: async (parent, { userId }) => {
      return Note.find({ author: userId });
    },

    getAllProgressEntries: async () => {
      return ProgressEntry.find();
    },

    getProgressEntryById: async (parent, { progressEntryId }) => {
      return ProgressEntry.findOne({ _id: progressEntryId });
    },
  },

  Mutation: {
    addUser: async (parent, { input }) => {
      try {
        console.log("incoming data:", input);
        const user = await User.create(input);

        if (!user) {
          console.error("User creation failed.");
        }

        const token = signToken(user);

        if (!token) {
          console.error("signToken returned Null!");
          throw new Error("failed to generate token");
        }

        console.log("✅ User created successfully:", user);
        console.log("✅ Token generated successfully:", token);

        return { token, user };
      } catch (err) {
        console.error("Error in addUser resolver:", err);
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with is email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("email or password is incorrect");
      }

      const token = signToken(user);
      return { token, user };
    },

    addCase: async (parent, { input }) => {
      const { assignedTo } = input;

      const newCase = await Case.create(input);

      await User.findByIdAndUpdate(assignedTo, {
        $push: { cases: newCase._id },
      });
      return newCase;
    },

    addNote: async (parent, { input }) => {
      const { caseId } = input;

      const note = await Note.create(input);

      await Case.findByIdAndUpdate(caseId, {
        $push: { notes: note._id },
      });

      return note;
    },

    addProgressEntry: async (parent, { input }) => {
      const entry = await ProgressEntry.create(input);

      return entry;
    },

    updateUser: async (parent, { userId, input }) => {
      return await User.findByIdAndUpdate(userId, input, {
        new: true,
        runValidators: true,
      });
    },

    updateCase: async (parent, { caseId, input }) => {
      return await Case.findByIdAndUpdate(caseId, input, {
        new: true,
        runValidators: true,
      });
    },

    updateNote: async (parent, { noteId, input }) => {
      return await Note.findByIdAndUpdate(noteId, input, {
        new: true,
        runValidators: true,
      });
    },

    updateProgressEntry: async (parent, { progressEntryId, input }) => {
      return await ProgressEntry.findByIdAndUpdate(progressEntryId, input, {
        new: true,
        runValidators: true,
      });
    },

    deleteUser: async (parent, { userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged In");
      }

      if (context.user.role !== "admin" && context.user._id.toString() !== userId) {
        throw new AuthenticationError("not authorized");
      }

      const session = await User.startSession();
      session.startTransaction();

      try {
        const deletedUser = await User.findOneAndDelete({ _id: userId }, { session });
  
        if (!deletedUser) {
          await session.abortTransaction();
          session.endSession();
          return null;
        };
  
        await Case.deleteMany({ assignedTo: userId }, { session });
        await Note.deleteMany({ author: userId }, { session });
        await ProgressEntry.deleteMany({ user: userId }, { session });
  
        await session.commitTransaction();
        session.endSession();

        return deletedUser;

      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error("delete failed: ", + error.message);
      }
    },

    deleteCase: async (parent, { id }) => {
      const deletedCase = await Case.findByIdAndDelete(id);

      if (!deletedCase) return false;

      await User.updateMany({ cases: id }, { $pull: { cases: id } });

      return true;
    },

    deleteNote: async (parent, { id }) => {
      const deletedNote = await Note.findByIdAndDelete(id);

      if (!deletedNote) return false;

      await User.updateMany({ notes: id }, { $pull: { notes: id } });

      await Case.updateMany({ notes: id }, { $pull: { notes: id } });

      return true;
    },

    deleteProgressEntry: async (parent, { id }) => {
      const deletedProgressEntry = await ProgressEntry.findByIdAndDelete(id);

      if (!deletedProgressEntry) return false;

      await User.updateMany(
        { progressEntries: id },
        { $pull: { progressEntries: id } }
      );
      return true;
    },

    deleteUserCase: async (parent, { userId, caseId }) => {
      const user = await User.findOne({ _id: userId, cases: caseId });

      if (!user) {
        throw new Error("User does not have this case.");
      }

      const deletedCase = await Case.findByIdAndDelete(caseId);
      if (!deletedCase) return false;

      await User.findByIdAndUpdate(
        userId,
        { $pull: { cases: caseId } },
        { new: true }
      );
      return true;
    },

    deleteUserNote: async (parent, { userId, noteId }) => {
      const user = await User.findOne({ _id: userId, notes: noteId });

      if (!user) {
        throw new Error("User does not have this Note.");
      }

      const deletedNote = await Note.findByIdAndDelete(noteId);
      if (!deletedNote) return false;

      await User.findByIdAndUpdate(
        userId,
        { $pull: { notes: noteId } },
        { new: true }
      );
      return true;
    },

    deleteUserProgressEntry: async (parent, { userId, progressEntryId }) => {
      const user = await User.findOne({
        _id: userId,
        progressEntries: progressEntryId,
      });

      if (!user) {
        throw new Error("User does not have this Progress entry.");
      }

      const deleteProgressEntry = await ProgressEntry.findByIdAndDelete(
        progressEntryId
      );
      if (!deleteProgressEntry) return false;

      await User.findByIdAndUpdate(
        userId,
        { $pull: { progressEntries: progressEntryId } },
        { new: true }
      );
      return true;
    },
  },

  User: {
    genderDisplay: (parent) => {
      return parent.gender === "Other" && parent.genderOther
        ? parent.genderOther
        : parent.gender || "Prefer not to say";
    },
    ethnicityDisplay: (parent) => {
      return parent.ethnicity === "Other" && parent.ethnicityOther
        ? parent.ethnicityOther
        : parent.ethnicity || "prefer not to say";
    },
  },
};

module.exports = resolvers;
