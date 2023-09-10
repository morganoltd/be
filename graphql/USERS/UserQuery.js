const { db } = require('../../firebase/firebase');

const UserQuery = {
  Query: {
    All_Users: () => {
      return db.collection('USERS')
        .get()
        .then((snapshot) => {
          const users = [];
          snapshot.forEach((doc) => {
            users.push(doc.data());
          });
          return users;
        })
        .catch((error) => {
          console.error('Error retrieving users:', error);
          return [];
        });
    },
    get_user: (_, { id }) => {
      return db.collection('USERS').doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
              return doc.data();
          } else {
            throw new Error('User not found');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user:', error);
          return null;
        });
    }
    },
};

module.exports = UserQuery;
