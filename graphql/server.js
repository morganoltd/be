const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const GAMES = require('./GAMES/GameSchema');
const GameMutation = require('./GAMES/GameMutation');
const GameQuery = require('./GAMES/GameQuery');

const USERS = require('./USERS/UserSchema');
const UserMutation = require('./USERS/UserMutation');
const UserQuery = require('./USERS/UserQuery');

const POST = require('./POST/PostSchema');
const PostMutation = require('./POST/PostMutation');
const PostQuery = require('./POST/PostQuery');

const POSTS = require('./POSTS/PostsSchema');
const PostsMutation = require('./POSTS/PostsMutation');
const PostsQuery = require('./POSTS/PostsQuery');

const COMMENTS = require('./COMMENTS/CommentsSchema')
const CommentsQuery = require('./COMMENTS/CommentsQuery')
const CommentsMutation = require('./COMMENTS/CommentsMutation');

const AUTH = require('./AUTH/AuthSchema')
const AuthQuery = require('./AUTH/AuthQuery')
const AuthMutation = require('./AUTH/AuthMutation');

const AVATARS = require('./AVATARS/AvatarsSchema')
const AvatarsQuery = require('./AVATARS/AvatarsQuery')
const AvatarsMutation = require('./AVATARS/AvatarsMutation');

const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: [GAMES, USERS, POST, POSTS, COMMENTS, AVATARS, AUTH],
    resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostQuery, PostsMutation, PostsQuery, CommentsQuery, CommentsMutation, AvatarsQuery, AvatarsMutation, AuthQuery, AuthMutation],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Serwer GraphQL jest uruchomiony na http://localhost:4000/graphql');
  });
}

startApolloServer().catch((err) => {
  console.error(err);
});
