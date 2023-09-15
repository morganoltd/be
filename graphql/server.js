const { ApolloServer } = require('apollo-server');
const admin = require('firebase-admin');
const express = require('express');
const expressGraphQL = require('express-graphql'); // Import express-graphql
const firebase = require('firebase/compat/app');
require('firebase/compat/storage');
require('firebase/compat/firestore');
require('firebase/compat/auth');

const storage = firebase.storage();
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('../key.json'); // Replace with your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyBoqLrKGVKefBJoFyf_D8Ayl_IQ6SBahJI",
  authDomain: "graminator.firebaseapp.com",
  databaseURL: "https://graminator-default-rtdb.firebaseio.com",
  projectId: "graminator",
  storageBucket: "graminator.appspot.com",
  messagingSenderId: "729954657369",
  appId: "1:729954657369:web:c63cd4e4efcbed87693d48",
  measurementId: "G-ZFZ6EK7BHJ"
};

firebase.initializeApp(firebaseConfig);

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

const COMMENTS = require('./COMMENTS/CommentsSchema');
const CommentsQuery = require('./COMMENTS/CommentsQuery');
const CommentsMutation = require('./COMMENTS/CommentsMutation');

const AUTH = require('./AUTH/AuthSchema');
const AuthQuery = require('./AUTH/AuthQuery');
const AuthMutation = require('./AUTH/AuthMutation');

const AVATARS = require('./AVATARS/AvatarsSchema');
const AvatarsQuery = require('./AVATARS/AvatarsQuery');
const AvatarsMutation = require('./AVATARS/AvatarsMutation');

const app = express();

const server = new ApolloServer({
  typeDefs: [GAMES, USERS, POST, POSTS, COMMENTS, AVATARS, AUTH],
  resolvers: [GameMutation, GameQuery, UserMutation, UserQuery, PostQuery, PostsMutation, PostsQuery, CommentsQuery, CommentsMutation, AvatarsQuery, AvatarsMutation, AuthQuery, AuthMutation],
  context: ({ req }) => ({ req }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});

module.exports = { storage, db, firebaseAuth };