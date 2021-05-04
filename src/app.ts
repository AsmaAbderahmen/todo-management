import express, {Express} from 'express'
import {graphQlSchema} from './graphql-schema';
import {graphqlHTTP} from 'express-graphql';
import {RootResolver} from './resolvers';
import {isAuth} from './middleware/is-auth';
import expressPlayground from 'graphql-playground-middleware-express';
import dotenv from 'dotenv';
import "dotenv/config.js";
import mongoose from 'mongoose'

dotenv.config();

const PORT: string | number = process.env.PORT || 4000
const app: Express = express()

//expressPlayground allows testing several queries and mutations with the possibility of sending userData on the header
app.get('/', expressPlayground({ endpoint: '/graphql'}))

app.use(
    '/graphql',
    isAuth,
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: RootResolver,
        graphiql: true,
    })
);
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.uonv1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology:false})
    .then(() => {
    app.listen(PORT);
    console.log(`server is listening on ${PORT}`);
})
.catch(err => {
    console.log(err);
});

//export app and mongoose to be used on other files such as test files
export default app;
export const db = mongoose;
