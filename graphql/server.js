require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
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

const IMG = require('./IMG/ImgSchema')
const ImgQuery = require('./IMG/ImgQuery')
const ImgMutation = require('./IMG/ImgMutation');

const ACHIEVEMENTS = require('./ACHIEVEMENTS/AchievementsSchema')
const AchievementsQuery = require('./ACHIEVEMENTS/AchievementsQuery')
const AchievementsMutation = require('./ACHIEVEMENTS/AchievementsMutation.js');

const PREMIUM = require('./PREMIUM/PremiumSchema')
const PremiumQuery = require('./PREMIUM/PremiumQuery')
const PremiumMutation = require('./PREMIUM/PremiumMutation');

const server = new ApolloServer({
    typeDefs: [GAMES, USERS, POSTS, COMMENTS, AUTH, IMG, ACHIEVEMENTS, PREMIUM],
    resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostsQuery, PostsMutation, CommentsQuery, CommentsMutation, AuthMutation, ImgQuery, ImgMutation, AchievementsQuery, AchievementsMutation, PremiumQuery, PremiumMutation],
 context: ({ req }) => ({ req }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
