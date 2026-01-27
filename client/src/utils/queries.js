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

`;