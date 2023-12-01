import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    phoneNumber: String!
    password: String!
    salt: String!
    lastLogin: String
    lastNotification: String
    lakes: [Int]!
  }

  type Lake {
    id: Int!
    name: String
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
    lastLogin: String
    lakes: [Int]!
  }

  input UserLoginInput {
    username: String!
    password: String!
  }

  type UserLakes {
    userLakes: [Int]!
  }

  type Query {
    user(id: Int!): User
    users: [User!]!
    counties: [County!]!
  }

  input CreateUserInput {
    username: String!
    password: String!
    phoneNumber: String!
    salt: String!
  }

  input UpdateUserLakesInput {
    userId: Int!
    lakeIds: [Int]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): DisplayUser
    login(input: UserLoginInput!): DisplayUser
    updateUserLakes(input: UpdateUserLakesInput!): UserLakes
  }
`;
