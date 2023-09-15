const firebase = require('firebase/compat/app');
require('firebase/compat/storage');
require('firebase/compat/firestore');
require('firebase/compat/auth');

const storage = firebase.storage();
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

module.exports = { storage, db, firebaseAuth };