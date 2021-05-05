import {buildSchema} from 'graphql';

export const graphQlSchema = buildSchema(`
type AuthData {
  id: ID!
  token: String!
  tokenExpiration: Int!
}
input TodoInput {
  title: String!
  description: String!
  owner:ID!
  guests: [String]
}
input UserInput {
  email: String!
  password: String!
  username:String!
}
input AuthInput {
  email: String!
  password: String!
}

type User {
  _id: ID!
  email: String!
  username: String
}
type Comment {
  _id: ID
  text: String
  user: User
  createdAt: String
}

type Todo {
  _id: ID!
  title: String!
  description: String!
  done: Boolean
  owner: User!
  guests: [User]
  comments:[Comment]
}

type Query {
  user(id: ID!): User
  userProfile: User
  users: [User]
  todos: [Todo]
  todo(id: ID!): Todo
}

type Mutation {
  login(authInput: AuthInput): AuthData
  signup(userInput: UserInput): User
  createTodo(title: String, description: String): Todo
  updateTodo(id:String,title: String, description: String, done: Boolean):Todo
  deleteTodo(id:String):String 
  shareTodo(id: String, new_guests:[String]):Todo
  commentTodo(id: String, text: String):Todo
}


`);
