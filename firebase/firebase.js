const firebase = require('firebase/compat/app');
require('firebase/compat/storage');
require('firebase/compat/firestore');
require('firebase/compat/auth');

const firebaseConfig = {
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const storage = firebase.storage();
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

module.exports = { storage, db, firebaseAuth };