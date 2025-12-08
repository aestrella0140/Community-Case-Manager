import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($input: CreateUserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        firstName
        lastName
        email
        role
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($userId: ID!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      firstName
      lastName
      gender
      ethnicity
    }
  }
`;

export const ADD_CASE = gql`
  mutation ($input: CreateCaseInput!) {
    addCase(input: $input) {
      _id
      firstName
      lastName
      dob
      status
      assignedTo {
        _id
      }
      notes {
        _id
        content
      }
    }
  }
`;

export const UPDATE_CASE = gql`
  mutation ($caseId: ID!, $input: UpdateCaseInput!) {
    updateCase(caseId: $caseId, input: $input) {
      status
    }
  }
`;

export const ADD_NOTE = gql`
  mutation ($input: CreateNoteInput!) {
    addNote(input: $input) {
      _id
      content
      author {
        _id
      }
      case {
        _id
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation Mutation($noteId: ID!, $input: UpdateNoteInput!) {
    updateNote(noteId: $noteId, input: $input) {
      content
    }
  }
`;

export const ADD_PROGRESSENTRY = gql`
  mutation ($input: CreateProgressEntryInput!) {
    addProgressEntry(input: $input) {
      _id
      title
      description
      date
      status
      case {
        _id
      }
      createdBy {
        _id
      }
    }
  }
`;

export const UPDATE_PROGRESSENTRY = gql`
  mutation ($progressEntryId: ID!, $input: UpdateProgressEntryInput!) {
    updateProgressEntry(progressEntryId: $progressEntryId, input: $input) {
      description
      status
      title
    }
  }
`;

export const LOGIN_USER = gql`
mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      firstName
      lastName
    }
  }
}
`;

