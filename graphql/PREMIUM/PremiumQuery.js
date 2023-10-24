const { db } = require("../../firebase/firebase");

const PremiumQuery = {
  Query: {
    all_Premium: () => {
        return db.collection('PREMIUM')
          .get()
          .then((snapshot) => {
            return snapshot.docs.map((doc) => doc.data());
          })
          .catch((error) => {
            console.error('Error retrieving premiums:', error);
            return [];
          });
      },
    }
}

module.exports = PremiumQuery;