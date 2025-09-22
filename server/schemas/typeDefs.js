const typeDefs = `
input CreateUserInput {
firstName: String!
lastName: String!
email: String!
password: String!
gender: String
genderOther: String
ethnicity: String
ethnicityOther: String
role: String!
}

input CreateCaseInput {
firstName: String!
lastName: String!
dob: String!
status: String
assignedTo: ID!
notes: [ID]
}

input CreateNoteInput {
content: String!
author: ID!
case: ID!
}

input CreateProgressEntryInput {
title: String!
description: String!
date: String!
status: String
case: ID!
createdBy: ID!
}

type User {
_id: ID!
firstName: String!
lastName: String!
email: String!
gender: String
genderOther: String
genderDisplay: String
ethnicity: String
ethnicityOther: String
ethnicityDisplay: String
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
  notes: [Note]
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
  status: String
  case: Case!
  createdBy: User!
  createdAt: String!
  updatedAt: String!
}

type Auth {
token: ID!
user: User
}

input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    gender: String
    genderOther: String
    genderDisplay: String
    ethnicity: String
    ethnicityOther: String
    ethnicityDisplay: String
    role: String
    }
    
    input UpdateCaseInput {
    firstName: String
    lastName: String
    dob: String
    status: String
    assignedTo: ID
    }
    
    input UpdateNoteInput {
    content: String
    authorId: ID
    caseId: ID
    }
    
    input UpdateProgressEntryInput {
    title: String
    description: String
    date: String
    status: String
    caseId: ID
    createdBy: ID
    }

type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getAllCases: [Case!]!
    getCaseById(id: ID!): Case
    getAllNotes: [Note!]!
    getNoteById(id: ID!): Note
    getAllProgressEntries: [ProgressEntry!]!
    getProgressEntryById(id: ID!): ProgressEntry
    getProgressEntriesByCase(caseId: ID!): [ProgressEntry!]!
    }
    
type Mutation {

addUser(input: CreateUserInput!): Auth
addCase(input: CreateCaseInput!): Case
addNote(input: CreateNoteInput!): Note
addProgressEntry(input: CreateProgressEntryInput!): ProgressEntry

login(email: String!, password: String!): Auth

updateUser(userId: ID!, input: UpdateUserInput!): User
updateCase(caseId: ID!, input: UpdateCaseInput!): Case
updateNote(noteId: ID!, input: UpdateNoteInput!): Note
updateProgressEntry(progressEntryId: ID!, input: UpdateProgressEntryInput!): ProgressEntry

deleteUser(id: ID!): Boolean!
deleteCase(id: ID!): Boolean!
deleteUserCase(userId: ID!, caseId: ID!): Boolean!
deleteNote(id: ID!): Boolean!
deleteUserNote(user: ID!, noteId: ID!): Boolean!
deleteProgressEntry(id: ID!): Boolean!
deleteUserProgressEntry(user: ID!, progressEntry: ID!): Boolean!
}

`;

module.exports = typeDefs;
