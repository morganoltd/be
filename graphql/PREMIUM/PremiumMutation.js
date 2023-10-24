const { db } = require('../../firebase/firebase');

const PremiumMutation = {
  Mutation: {
    add_Premium: async (_, { name, url, format, tags }) => {
      try {
        const premiumRef = db.collection('PREMIUM').doc(name);

        const premiumData = {
          name,
          url,
          format,
          tags,
          used: 0,
        };

        await premiumRef.set(premiumData);

        return premiumData; 
      } catch (error) {
        console.error('Error adding Premium:', error);
        throw new Error('Nie udało się dodać obrazka.');
    }
    },
    counter_used: async (_, { id }) => {
      try {
        const premiumRef = db.collection('PREMIUM').doc(id);

        const premiumSnapshot = await premiumRef.get();

        if (!premiumSnapshot.exists) {
          throw new Error('Nie znaleziono obrazka o podanym id.');
        }

        const premiumData = premiumSnapshot.data();
        const updatedUsed = premiumData.used + 1;

        await premiumRef.update({ used: updatedUsed });

        return updatedUsed; 
      } catch (error) {
        throw new Error('Nie udało się zaktualizować licznika użycia.');
      }
    },
  },
};

module.exports = PremiumMutation;
