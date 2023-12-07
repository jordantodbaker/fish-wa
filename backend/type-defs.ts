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

  type UpdateUserValues {
    phoneNumber: String
    sendText: Boolean
    sendEmail: Boolean
  }

  type UserLakes {
    userLakes: [Int]!
  }

  type Query {
    user(email: String): User
    counties: [County!]!
  }

  input UpdateUserLakesInput {
    userId: Int!
    lakeIds: [Int]!
  }

  input UpdateUserInput {
    userId: Int!
    phoneNumber: String
    sendText: Boolean
    sendEmail: Boolean
  }

  type Mutation {
    updateUserLakes(input: UpdateUserLakesInput!): UserLakes
    updateUser(input: UpdateUserInput!): Int
  }
`;
