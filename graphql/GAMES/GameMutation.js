const { db } = require("../../firebase/firebase");

const GameMutation = {
  Mutation: {
    addGame: async (_, { input }) => {
      const titleKey = input.title
        .toLowerCase()
        .replace(/ /g, "_")
        .replace(/[:\']/g, "")
        .replace(/&/g, "and");
      const gamesCollection = db.collection("GAMES");
      const newGame = {
        id: titleKey,
        likes: 0,
        ...input,
      };

      try {
        await gamesCollection.doc(titleKey).set(newGame);
        return newGame;
      } catch (error) {
        console.error("Error adding game:", error);
        return null;
      }
    },
    deleteGame: async (_, { id }) => {
      const gamesCollection = db.collection("GAMES");

      try {
        const gameDoc = await gamesCollection.doc(id).get();
        if (gameDoc.exists) {
          const game = gameDoc.data();
          await gamesCollection.doc(id).delete();
          return game;
        } else {
          throw new Error("Game not found");
        }
      } catch (error) {
        console.error("Error deleting game:", error);
        return null;
      }
    },
    updateGame: async (_, { id, input }) => {
      const gamesCollection = db.collection("GAMES");

      try {
        const gameDoc = await gamesCollection.doc(id).get();
        if (gameDoc.exists) {
          const gameData = gameDoc.data();
          const updatedGame = {
            ...gameData,
            ...input,
          };

          await gamesCollection.doc(id).update(updatedGame);
          return updatedGame;
        } else {
          throw new Error("Game not found");
        }
      } catch (error) {
        console.error("Error updating game:", error);
        return null;
      }
    },
    likeGame: async (_, { id }) => {
      try {
        const gamesCollection = db.collection("GAMES");
        const gameDoc = await gamesCollection.doc(id).get();

        if (gameDoc.exists) {
          const gameData = gameDoc.data();
          console.log("Found game with data:", gameData);

          await gameDoc.ref.update({ likes: (gameData.likes || 0) + 1 });

          return {
            ...gameData,
            id: gameDoc.id,
            likes: (gameData.likes || 0) + 1,
          };
        } else {
          throw new Error("Game does not exist");
        }
      } catch (error) {
        console.error("Error liking game:", error);
        throw new Error("An error occurred while liking the game");
      }
    },
    unlikeGame: async (_, { id }) => {
      try {
        const gamesCollection = db.collection("GAMES");
        const gameDoc = await gamesCollection.doc(id).get();

        if (gameDoc.exists) {
          const gameData = gameDoc.data();
          console.log("Found game with data:", gameData);

          const newLikes = Math.max((gameData.likes || 0) - 1, 0);

          await gameDoc.ref.update({ likes: newLikes });

          return { ...gameData, id: gameDoc.id, likes: newLikes };
        } else {
          throw new Error("Game does not exist");
        }
      } catch (error) {
        console.error("Error unliking game:", error);
        throw new Error("An error occurred while unliking the game");
      }
    },
  },
};

module.exports = GameMutation;
