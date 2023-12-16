const { ApolloServer } = require('apollo-server-express');
const express = require('express');

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

const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: [GAMES, USERS, POSTS, COMMENTS, AUTH, ACHIEVEMENTS, PREMIUM, ALERTS],
    resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostsQuery, PostsMutation, CommentsQuery, CommentsMutation, AuthMutation, AchievementsQuery, AchievementsMutation, PremiumQuery, PremiumMutation, AlertsQuery, AlertsMutation],
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
