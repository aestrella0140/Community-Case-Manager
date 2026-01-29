import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      email
      firstName
      lastName
      gender
      genderDisplay
      genderOther
      role
      ethnicity
      ethnicityDisplay
      ethnicityOther
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      _id
      firstName
      lastName
      gender
      genderDisplay
      genderOther
      ethnicity
      ethnicityDisplay
      ethnicityOther
      cases {
        _id
        firstName
        lastName
        status
      }
    }
  }
`;

export const GET_ALL_CASES = gql`
  query GetAllCases {
    getAllCases {
      _id
      firstName
      lastName
      status
      dob
      assignedTo {
        _id
        firstName
        lastName
      }
      notes {
        _id
        content
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CASE_BY_ID = gql`
query GetCaseById($getCaseByIdId: ID!) {
  getCaseById(id: $getCaseByIdId) {
    _id
    firstName
    lastName
    status
    dob
    notes {
      _id
      content
      createdAt
      updatedAt
    }
  }
}
`;

