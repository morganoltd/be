const { buildSchema, GraphQLObjectType } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require();

const app = express();

// Allow cross-origin
app.use(cors());

// Define your schema types and resolvers for each type
const GAMES = require('./graphql/GAMES');
const USERS = require('./graphql/USERS');
const POST = require('./graphql/POST');
const POSTS = require('./graphql/POSTS');
const COMMENTS = require('./graphql/COMMENTS');
const AUTH = require('./graphql/AUTH');
const AVATARS = require('./graphql/AVATARS');

// Combine the schemas into one
const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...GAMES.query,
    ...USERS.query,
    ...POST.query,
    ...POSTS.query,
    ...COMMENTS.query,
    ...AUTH.query,
    ...AVATARS.query,
  },
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...GAMES.mutation,
    ...USERS.mutation,
    ...POST.mutation,
    ...POSTS.mutation,
    ...COMMENTS.mutation,
    ...AUTH.mutation,
    ...AVATARS.mutation,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));