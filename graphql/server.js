const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');

// Import your schema and resolvers from the graphql folder
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

const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: [GAMES, USERS, POST, POSTS, COMMENTS, AVATARS, AUTH],
    resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostQuery, PostsMutation, PostsQuery, CommentsQuery, CommentsMutation, AvatarsQuery, AvatarsMutation, AuthQuery, AuthMutation],
  });

  await server.start();

  server.applyMiddleware({ app });

  // Serve your static assets if needed (e.g., images, HTML files)
  app.use(express.static(path.join(__dirname, 'public')));

  // Define the route for GraphQL, adjust the path as needed
  app.use('/graphql', (req, res) => {
    res.status(200).send('Welcome to GraphQL!');
  });

  // Use environment variable for the port or default to 4000
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApolloServer().catch((err) => {
  console.error(err);
});