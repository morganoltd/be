require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: (`${process.env.private_key}`).replace(/\\n/g, '\n'),
    client_email: process.env.client_email,
  }),
});

const GAMES = require('./GAMES/GameSchema');
const GameMutation = require('./GAMES/GameMutation');
const GameQuery = require('./GAMES/GameQuery');

const USERS = require('./USERS/UserSchema');
const UserMutation = require('./USERS/UserMutation');
const UserQuery = require('./USERS/UserQuery');

const POSTS = require('./POSTS/PostsSchema');
const PostsMutation = require('./POSTS/PostsMutation');
const PostsQuery = require('./POSTS/PostsQuery');

const COMMENTS = require('./COMMENTS/CommentsSchema')
const CommentsQuery = require('./COMMENTS/CommentsQuery')
const CommentsMutation = require('./COMMENTS/CommentsMutation');

const AUTH = require('./AUTH/AuthSchema')
const AuthMutation = require('./AUTH/AuthMutation');

const ACHIEVEMENTS = require('./ACHIEVEMENTS/AchievementsSchema')
const AchievementsQuery = require('./ACHIEVEMENTS/AchievementsQuery')
const AchievementsMutation = require('./ACHIEVEMENTS/AchievementsMutation.js');

const PREMIUM = require('./PREMIUM/PremiumSchema')
const PremiumQuery = require('./PREMIUM/PremiumQuery')
const PremiumMutation = require('./PREMIUM/PremiumMutation');

const ALERTS = require('./ALERTS/AlertsSchema')
const AlertsQuery = require('./ALERTS/AlertsQuery')
const AlertsMutation = require('./ALERTS/AlertsMutation');

const server = new ApolloServer({
  typeDefs: [GAMES, USERS, POSTS, COMMENTS, AUTH, ACHIEVEMENTS, PREMIUM, ALERTS],
  resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostsQuery, PostsMutation, CommentsQuery, CommentsMutation, AuthMutation, AchievementsQuery, AchievementsMutation, PremiumQuery, PremiumMutation, AlertsQuery, AlertsMutation],
 context: ({ req }) => ({ req }),
 introspection: true,
 playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});