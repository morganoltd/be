require('dotenv').config();

const firebase = require('firebase/compat/app');
require('firebase/compat/storage');
require('firebase/compat/firestore');
require('firebase/compat/auth');

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

module.exports = { storage, db, firebaseAuth };
