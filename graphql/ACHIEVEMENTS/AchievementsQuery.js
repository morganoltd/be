const { db } = require('../../firebase/firebase');

const AchievementQuery = {
  Query: {
    all_achievements: () => {
      return db.collection('ACHIEVEMENTS')
        .get()
        .then((snapshot) => {
          const achievements = [];

          snapshot.forEach((doc) => {
            if (doc.id !== 'counter') {
              achievements.push(doc.data());
            }
          });

          return achievements;
        })
        .catch((error) => {
          console.error('Error retrieving achievements:', error);
          return [];
        });
    },

    current_achievements: async () => {
      try {
        const currentDate = new Date().toISOString();

        const snapshot = await db.collection('ACHIEVEMENTS')
          .where('endsAt', '>', currentDate)
          .get();

        const achievements = [];

        snapshot.forEach((doc) => {
          if (doc.id !== 'counter') {
            achievements.push(doc.data());
          }
        });

        return achievements;
      } catch (error) {
        console.error('Error retrieving current achievements:', error);
        return [];
      }
    },
  },
};

module.exports = AchievementQuery;
  