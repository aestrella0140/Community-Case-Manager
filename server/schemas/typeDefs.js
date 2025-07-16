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
getAllProgressEntryById(id: ID!): ProgressEntry
getAllProgressEntries: [ProgressEntry!]!
getProgressEntriesByCase(caseId: ID!): [ProgressEntry!]!
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

addProgressEntry (
title: String!,
desctription: String!,
date: String!,
status: String!,
case: ID!,
createdBy: ID!
): ProgressEntry

input UpdateUserInput {
firstName: String
lastName: String
email: String
password: String
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

updateUser:(userId: ID!, updateUserInput!): User
updateCase(caseId: ID!, input: UpdateCaseInput!): Case
updateNote(noteId: ID!, input: UpdateNoteInput!): Note
updateProgressEntry(entryId: ID!, input updateProgressEntry!): ProgressEntry

deleteUser(id: ID!): Boolean!
deleteCase(id: ID!): Boolean!
deleteUserCase(userId: ID!, caseId: ID!): Boolean!
deleteNote(id: ID!): Boolean!
deleteUserNote(user: ID!, noteId: ID!): Boolean!
deleteProgressEntry(id: ID!): Boolean!
deleteUserProgressEntry(user: ID!, progressEntry: ID!): Boolean!

type Auth {
token: ID!
user: User
}
`;

module.exports = typeDefs;
