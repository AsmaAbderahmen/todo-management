import {buildSchema} from 'graphql';

export const graphQlSchema = buildSchema(`
type Query {
   hello: String
}
`);
