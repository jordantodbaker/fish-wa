import { gql } from "@apollo/client";

export const typeDefs = gql`
  type StockingReport {
    lakeId: Int
    name: String
    date: String
    number: Int
    species: String
    size: Float
  }
  type User {
    id: Int!
    email: String!
    phoneNumber: String
    lastLogin: String
    lastNotification: String
    sendText: Boolean
    sendEmail: Boolean
    lakes: [Lake]
    lakeIds: [Int]
    stockingReports: [StockingReport]
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
    email: String!
    phoneNumber: String
    message: String!
    accessToken: String
    lastLogin: String
    sendText: Boolean
    sendEmail: Boolean
    lakes: [Lake]
    lakeIds: [Int]
    stockingReports: [StockingReport]
  }

  type UserLakes {
    userLakes: [Int]!
  }

  type Query {
    user(email: String!): User
    counties: [County!]!
  }

  input CreateUserInput {
    email: String!
    phoneNumber: String
  }

  input UpdateUserLakesInput {
    userId: Int!
    lakeIds: [Int]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): DisplayUser
    updateUserLakes(input: UpdateUserLakesInput!): UserLakes
  }
`;
