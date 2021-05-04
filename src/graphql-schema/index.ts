import {buildSchema} from 'graphql';

export const graphQlSchema = buildSchema(`
type AuthData {
  id: ID!
  token: String!
  tokenExpiration: Int!
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

type Query {
  user(id: ID!): User
  userProfile: User
  users: [User]

}

type Mutation {
  login(authInput: AuthInput): AuthData
  singup(userInput: UserInput): User

}


`);
