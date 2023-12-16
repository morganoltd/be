const { db } = require("../../firebase/firebase");

const PremiumQuery = {
  Query: {
    allPremiumItems: () => {
        return db.collection('PREMIUM')
          .get()
          .then((snapshot) => {
            return snapshot.docs.map((doc) => doc.data());
          })
          .catch((error) => {
            console.error('Error retrieving premium items:', error);
            return [];
          });
      },
    }
}

module.exports = PremiumQuery;