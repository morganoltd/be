const { db } = require('../../firebase/firebase');

const AvatarsMutation = {
  Mutation: {
    addAvatar: async (_, { name, url, tags }) => {
      try {

        // Convert game IDs to lowercase for case-insensitive comparison
        const lowercaseGames = tags.map(tag => tag.toLowerCase());

        const validGamesSnapshot = await db.collection('GAMES')
          .where('id', 'in', lowercaseGames)
          .get();

        const validGames = validGamesSnapshot.docs.map(doc => doc.data().id);
      
        if (validGames.length !== tags.length) {
          throw new Error('Invalid game.');
        }

        const docRef = db.collection('AVATARS').doc(name);
        await docRef.set({
          name: name,
          url: url,
          tags: validGames,
        });

        return {
          name: name,
          url: url,
          tags: validGames,
        };

      } catch (error) {
        console.error('Error adding avatar', error);
        throw new Error('An error occurred while adding the avatar');
      }
    },
  },
};

module.exports = AvatarsMutation;