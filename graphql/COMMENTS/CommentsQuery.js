const { db } = require('../../firebase/firebase');

const CommentsQuery = {
  Query: {
    All_Comments: async () => {
      try {
        const querySnapshot = await db.collectionGroup('COMMENTS').get();
        const comments = querySnapshot.docs.map(doc => {
          const comment = doc.data();
          comment.commentID = doc.id;
          return comment;
        });
        return comments;
      } catch (error) {
        console.error('Error retrieving comments:', error);
        return [];
      }
    },
    getCommentsForPost: async (_, { postID }) => {
      try {
        const userDocs = await db.collection('USERS').get();

        for (const userDoc of userDocs.docs) {
          const postsRef = userDoc.ref.collection('POSTS');

          const postDoc = await postsRef.doc(postID).get();

          if (postDoc.exists) {
            const commentsRef = postDoc.ref.collection('COMMENTS');

            const querySnapshot = await commentsRef.get();

            if (querySnapshot.empty) {
              console.log('No comments found for this post.');
              return [];
            }

            const comments = querySnapshot.docs.map(doc => {
              const comment = doc.data();
              comment.commentID = doc.id;
              comment.userId = userDoc.id;
              return comment;
            });

            return comments;
          }
        }

        console.log('Post not found.');
        return [];
      } catch (error) {
        console.error('Error retrieving comments:', error);
        return [];
      }
    },
  },
};

module.exports = CommentsQuery;