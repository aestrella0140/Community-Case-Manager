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
    addUser: async (parseConstValue, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // addUser: async (
    //   parent,
    //   {
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     gender,
    //     genderOther,
    //     ethnicity,
    //     ethnicityOther,
    //     role,
    //   }
    // ) => {
    //   console.log("--add usedr start--");
    //   console.log("Incoming args", {
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     gender,
    //     genderOther,
    //     ethnicity,
    //     ethnicityOther,
    //     role,
    //   });

    //   try {
    //     const user = await User.create({
    //       firstName,
    //       lastName,
    //       email,
    //       password,
    //       gender,
    //       genderOther,
    //       ethnicity,
    //       ethnicityOther,
    //       role,
    //     });

    //     if (!user) {
    //       console.log("❌ User creation failed — Mongoose returned null!");
    //       throw new Error("User creation failed");
    //     }

    //     console.log("User Created successfully:", user);

    //     const token = signToken(user);
    //     console.log("Token Created successfully:", token);

    //     if (!token) {
    //       console.error("❌ signToken returned null!");
    //       throw new Error("Failed to generate token");
    //     }

    //     return { token, user };
    //   } catch (err) {
    //     console.error("ERROR in addUser resolver:", err);
    //     throw new Error("Failed to create user");
    //   }
    // },

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

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
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
