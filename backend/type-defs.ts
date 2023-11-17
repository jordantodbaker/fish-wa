import { gql } from "@apollo/client";

export const typeDefs = gql`
  enum TaskStatus {
    active
    completed
  }

  type Task {
    id: Int!
    title: String!
    status: TaskStatus!
  }

  type User {
    id: Int!
    username: String!
    phoneNumber: String
    password: String!
    salt: String!
    hash: String!
    iterations: Int!
  }

  type Query {
    users: [User!]!
    tasks(status: TaskStatus): [Task!]!
    task(id: Int!): Task
  }

  input CreateTaskInput {
    title: String!
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  input UpdateTaskInput {
    id: Int!
    title: String
    status: TaskStatus
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: Int!): Task
  }
`;
