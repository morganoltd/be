const { db } = require("../../firebase/firebase");

const PostQuery = {
  Query: {
    Post_Test: async () => {
      try {
        const docRef = db.collection("POST").doc("elden_ring");
        const doc = await docRef.get();

        if (doc.exists) {
          const data = doc.data();
          return [
            {
              footer: data.footer || {},
              field: data.field || {},
            },
          ];
        } else {
          return [];
        }
      } catch (error) {
        console.error("Error retrieving post:", error);
        return [];
      }
    },
  },
};

module.exports = PostQuery;
