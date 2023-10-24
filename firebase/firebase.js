const firebase = require('firebase/compat/app');
require('firebase/compat/storage');
require('firebase/compat/firestore');
require('firebase/compat/auth');

const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const storage = firebase.storage();
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

module.exports = { storage, db, firebaseAuth };