const { db } = require('../../firebase/firebase');

const PremiumMutation = {
  Mutation: {
    addPremiumItem: async (_, { name, url, unit }) => {
      try {
        const documentName = name.toLowerCase().replace(/\s+/g, '_');
    
        const premiumRef = db.collection('PREMIUM').doc(documentName);
    
        const premiumData = {
          id: documentName,
          name,
          url,
          unit,
        };
    
        await premiumRef.set(premiumData);
    
        return premiumData;
      } catch (error) {
        console.error('Error adding Premium:', error);
        throw new Error('Nie udało się dodać obrazka.');
      }
    },    
  },
};

module.exports = PremiumMutation;

