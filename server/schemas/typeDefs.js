const typeDefs = `
input CreateUserInput {
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

input CreateCaseInput {
firstName: String!
lastName: String!
dob: String!
status: String!
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
    getAllCases: [Case!]!
    getCaseById(id: ID!): Case
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getAllProgressEntryById(id: ID!): ProgressEntry
    getAllProgressEntries: [ProgressEntry!]!
    getProgressEntriesByCase(caseId: ID!): [ProgressEntry!]!
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
    
type Mutation {

addUser(input: CreateUserInput!): Auth!



login(email: String!, password: String!): Auth

updateUser(userId: ID!, input: UpdateUserInput!): User
updateCase(caseId: ID!, input: UpdateCaseInput!): Case
updateNote(noteId: ID!, input: UpdateNoteInput!): Note
updateProgressEntry(entryId: ID!, input: UpdateProgressEntryInput!): ProgressEntry

deleteUser(id: ID!): Boolean!
deleteCase(id: ID!): Boolean!
deleteUserCase(userId: ID!, caseId: ID!): Boolean!
deleteNote(id: ID!): Boolean!
deleteUserNote(user: ID!, noteId: ID!): Boolean!
deleteProgressEntry(id: ID!): Boolean!
deleteUserProgressEntry(user: ID!, progressEntry: ID!): Boolean!
}


type Auth {
token: ID!
user: User!
}
`;

module.exports = typeDefs;
