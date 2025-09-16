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

`;