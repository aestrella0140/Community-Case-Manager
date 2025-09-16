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
