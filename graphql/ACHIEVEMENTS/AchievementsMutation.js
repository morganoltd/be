const { db } = require('../../firebase/firebase');
const { doc, updateDoc, arrayUnion, arrayRemove } = require('firebase/firestore');

const getCurrentCounterValue = async () => {
  const counterDoc = await db.collection('ACHIEVEMENTS').doc('counter').get();
  return counterDoc.exists ? counterDoc.data().value : 0;
};

const updateCounterValue = async (newValue) => {
  await db.collection('ACHIEVEMENTS').doc('counter').set({ value: newValue });
};

const AchievementMutation = {
  Mutation: {
    addNewAchievement: async (_, { title, description, endsAt }) => {
      try {
        const existingAchievement = await db.collection('ACHIEVEMENTS').where('title', '==', title).get();

        if (!existingAchievement.empty) {
          throw new Error('An achievement with the same title already exists.');
        }

        let achievementCounter = await getCurrentCounterValue();

        achievementCounter += 1;

        const number = achievementCounter;
        const createdAt = new Date().toISOString();
        const sanitizedTitle = title.toLowerCase().replace(/[\s-]+/g, '_');
        const achievementId = `${number}-${sanitizedTitle}`;
        const achievementRef = db.collection('ACHIEVEMENTS').doc(achievementId);

        const newAchievement = {
          createdAt,
          title,
          number,
          accepted: [],
          finished: [],
          description,
          endsAt,
          awards: [],
        };

        await achievementRef.set(newAchievement);

        await updateCounterValue(achievementCounter);

        return newAchievement;
      } catch (error) {
        console.error('Error adding new achievement:', error);
        throw new Error('An error occurred while adding the new achievement');
      }
    },

    acceptedUsers_achievements: async (_, { achievement, username }) => {
      try {
        await updateDoc(doc(db, 'ACHIEVEMENTS', achievement), {
          accepted: arrayUnion(username),
        });

        return 'Achievement accepted successfully';
      } catch (error) {
        console.error('Error accepting achievement:', error);
        throw new Error('An error occurred while accepting the achievement');
      }
    },

    finishedUsers_achievements: async (_, { achievement, username }) => {
      try {
        await updateDoc(doc(db, 'ACHIEVEMENTS', achievement), {
          accepted: arrayRemove(username),
          finished: arrayUnion(username),
        });
    
        return 'Achievement finished successfully';
      } catch (error) {
        console.error('Error finishing achievement:', error);
        throw new Error('An error occurred while finishing the achievement');
      }
    },
      addAwards_achievements: async (_, { achievement, premiumID }) => {
        try {
          await updateDoc(doc(db, 'ACHIEVEMENTS', achievement), {
            awards: arrayUnion(premiumID),
          });
  
          return 'Award added successfully';
        } catch (error) {
          console.error('Error adding awards:', error);
          throw new Error('An error occurred while adding the award');
        }
      },
    },
};

module.exports = AchievementMutation;