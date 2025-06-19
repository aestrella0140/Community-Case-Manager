const typeDefs = `
type User {
_id: ID!
firstName: String!
lastName: String!
email: String!
password: String!
role: String!
cases: [Case!]!
}

type Case {
_id: ID!
firstName: String!
lastName: String!
dob: String!
status: String!
assignedTo: User!
notes: [Note!]!
createdAt: String!
updatedAt: String!
}

type Note {
_id: ID!
content: String!
author: User!
case: Case!
createdAt: String!
updatedAt: String!
}

type ProgressEntry {
_id: ID!
title: String!
description: String!
date: String!
status: String!
case: Case!
createdBy: User!
createdAt: String!
updatedAt: String!
}

type Query {
getAllCases: [Case!]!
getCaseById(id: ID!): Case
getAllUsers: [User!]!
getUserById(id: ID!): User
}

type Mutation {
addUser (
    firstName: String!,
    lastName: String!,
    email: String!,
    password: String!,
    role: String!,
): User!

login:(email: String!, password: String!): Auth

addCase (
firstName: String!,
lastName: String!,
dob: String!,
assignedTo: ID!
): Case!

addNote (
content: String!,
authorId: ID!,
caseId: ID!
): Note!
}

type Auth {
token: ID!
user: User
}
`;

module.exports = typeDefs;
