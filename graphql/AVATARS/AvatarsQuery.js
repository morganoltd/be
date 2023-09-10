const { db } = require("../../firebase/firebase");

const AvatarsQuery = {
  Query: {
    All_Avatars: () => {
        return db.collection('AVATARS')
          .get()
          .then((snapshot) => {
            return snapshot.docs.map((doc) => doc.data());
          })
          .catch((error) => {
            console.error('Error retrieving avatars:', error);
            return [];
          });
      },
    }
}

module.exports = AvatarsQuery;