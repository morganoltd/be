const { ApolloServer } = require('apollo-server');
const admin = require('firebase-admin');

const serviceAccount = require('../key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const GAMES = require('./GAMES/GameSchema');
const GameMutation = require('./GAMES/GameMutation');
const GameQuery = require('./GAMES/GameQuery');

const USERS = require('./USERS/UserSchema');
const UserMutation = require('./USERS/UserMutation');
const UserQuery = require('./USERS/UserQuery');

const POST = require('./POST/PostSchema');
const PostQuery = require('./POST/PostQuery');

const POSTS = require('./POSTS/PostsSchema');
const PostsMutation = require('./POSTS/PostsMutation');
const PostsQuery = require('./POSTS/PostsQuery');

const AUTH = require('./AUTH/AuthSchema');
const AuthQuery = require('./AUTH/AuthQuery');
const AuthMutation = require('./AUTH/AuthMutation');

const AVATARS = require('./AVATARS/AvatarsSchema');
const AvatarsQuery = require('./AVATARS/AvatarsQuery');
const AvatarsMutation = require('./AVATARS/AvatarsMutation');

const server = new ApolloServer({
  typeDefs: [GAMES, USERS, POST, POSTS, AVATARS, AUTH],
  resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostQuery, PostsMutation, PostsQuery, AvatarsQuery, AvatarsMutation, AuthQuery, AuthMutation],
  context: ({ req }) => ({ req }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});