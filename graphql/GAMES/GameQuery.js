const { db } = require('../../firebase/firebase');

const GameQuery = {
  Query: {
    single_game: (_, { id }) => {
      return db.collection('GAMES').doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data();
          } else {
            throw new Error('Game not found');
          }
        })
        .catch((error) => {
          console.error('Error retrieving game:', error);
          return null;
        });
    },
    all_games: () => {
      return db.collection('GAMES')
        .get()
        .then((snapshot) => {
          const games = [];
          snapshot.forEach((doc) => {
            games.push(doc.data());
          });
          return games;
        })
        .catch((error) => {
          console.error('Error retrieving top games:', error);
          return [];
        });
    },
  },
};

module.exports = GameQuery;
