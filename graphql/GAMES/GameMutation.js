const { db } = require('../../firebase/firebase');

const GameMutation = {
  Mutation: {
    addGame: async (_, { input }) => {
      const titleKey = input.title.toLowerCase().replace(/ /g, '_').replace(/[:\']/g, '').replace(/&/g, 'and');
      const gamesCollection = db.collection('GAMES');
      const newGame = {
        id: titleKey,
        ...input,
      };

      try {
        await gamesCollection.doc(titleKey).set(newGame);
        return newGame;
      } catch (error) {
        console.error('Error adding game:', error);
        return null;
      }
    },
    updateGameStore: async (_, { id, storeInput }) => {
      const gamesCollection = db.collection('GAMES');

      try {
        const gameDoc = await gamesCollection.doc(id).get();
        if (gameDoc.exists) {
          const game = gameDoc.data();
          game.store = { ...game.store, ...storeInput };
          await gamesCollection.doc(id).set(game);
          return game;
        } else {
          throw new Error('Game not found');
        }
      } catch (error) {
        console.error('Error updating game property:', error);
        return null;
      }
    },
    deleteGame: async (_, { id }) => {
      const gamesCollection = db.collection('GAMES');

      try {
        const gameDoc = await gamesCollection.doc(id).get();
        if (gameDoc.exists) {
          const game = gameDoc.data();
          await gamesCollection.doc(id).delete();
          return game;
        } else {
          throw new Error('Game not found');
        }
      } catch (error) {
        console.error('Error deleting game:', error);
        return null;
      }
    },
  },
};

module.exports = GameMutation;
