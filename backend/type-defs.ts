import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    phoneNumber: String!
    password: String!
    salt: String!
  }

  type Lake {
    id: Int!
    name: String!
  }

  type County {
    id: Int!
    name: String!
    shortName: String!
    lakes: [Lake!]!
  }

  type DisplayUser {
    id: Int
    username: String!
    phoneNumber: String!
    message: String!
    accessToken: String
  }

  input UserLoginInput {
    username: String!
    password: String!
  }

  type Query {
    users: [User!]!
    counties: [County!]!
  }

  input CreateUserInput {
    username: String!
    password: String!
    phoneNumber: String!
    salt: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): DisplayUser
    login(input: UserLoginInput!): DisplayUser
  }
`;
