const { db } = require("../../firebase/firebase");

const ImgQuery = {
  Query: {
    all_Img: () => {
        return db.collection('IMG')
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

module.exports = ImgQuery;