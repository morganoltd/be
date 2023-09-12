const { ApolloServer } = require('apollo-server');
const admin = require('firebase-admin');

const GAMES = require('./graphql/GAMES/GameSchema');
const GameMutation = require('./graphql/GAMES/GameMutation');
const GameQuery = require('./graphql/GAMES/GameQuery');

const USERS = require('./graphql/USERS/UserSchema');
const UserMutation = require('./graphql/USERS/UserMutation');
const UserQuery = require('./graphql/USERS/UserQuery');

const POST = require('./graphql/POST/PostSchema');
const PostMutation = require('./graphql/POST/PostMutation');
const PostQuery = require('./graphql/POST/PostQuery');

const POSTS = require('./graphql/POSTS/PostsSchema');
const PostsMutation = require('./graphql/POSTS/PostsMutation');
const PostsQuery = require('./graphql/POSTS/PostsQuery');

const COMMENTS = require('./graphql/COMMENTS/CommentsSchema');
const CommentsQuery = require('./graphql/COMMENTS/CommentsQuery');
const CommentsMutation = require('./graphql/COMMENTS/CommentsMutation');

const AUTH = require('./graphql/AUTH/AuthSchema');
const AuthQuery = require('./graphql/AUTH/AuthQuery');
const AuthMutation = require('./graphql/AUTH/AuthMutation');

const AVATARS = require('./graphql/AVATARS/AvatarsSchema');
const AvatarsQuery = require('./graphql/AVATARS/AvatarsQuery');
const AvatarsMutation = require('./graphql/AVATARS/AvatarsMutation');

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('key.json'); // Replace with your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://graminator.firebaseio.com', // Replace with your Firebase project URL
});

const server = new ApolloServer({
  typeDefs: [GAMES, USERS, POST, POSTS, COMMENTS, AVATARS, AUTH],
  resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostQuery, PostsMutation, PostsQuery, CommentsQuery, CommentsMutation, AvatarsQuery, AvatarsMutation, AuthQuery, AuthMutation],
  context: ({ req }) => ({ req }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});