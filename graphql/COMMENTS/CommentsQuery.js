const admin = require('firebase-admin');
const serviceAccount = require('../../key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://graminator-default-rtdb.firebaseio.com/',
  databaseAuthVariableOverride: {
    uid: 'comments-worker', // Set a unique UID for the Realtime Database access
  },
});

const CommentsQuery = {
  Query: {
    All_Comments: async () => {
      try {
        // Get a reference to the 'COMMENTS' node in the Firebase Realtime Database
        const commentsRef = admin.database().ref('COMMENTS');
        const commentsSnapshot = await commentsRef.once('value');

        const allComments = [];
        commentsSnapshot.forEach((postSnapshot) => {
          const postTitle = postSnapshot.key;
          const postComments = postSnapshot.val();

          // Convert the comments object to an array of comments with IDs
          const postCommentsArray = Object.entries(postComments).map(([commentId, commentData]) => ({
            id: commentId,
            ...commentData,
          }));

          // Add postTitle (the post's title) as a property to each comment object
          postCommentsArray.forEach((comment) => {
            comment.postTitle = postTitle;
          });

          allComments.push(...postCommentsArray);
        });

        return allComments;
      } catch (error) {
        console.error('Error retrieving comments:', error);
        return [];
      }
    },
    CommentsQuery: async (_, { title }) => {
      try {
        // Get a reference to the 'COMMENTS' node in the Firebase Realtime Database
        const commentsRef = admin.database().ref('COMMENTS').child(title);
        const commentsSnapshot = await commentsRef.once('value');

        if (!commentsSnapshot.exists()) {
          return []; // Return an empty array if no comments found for the given title
        }

        const postComments = commentsSnapshot.val();

        // Convert the comments object to an array of comments with IDs
        const postCommentsArray = Object.entries(postComments).map(([commentId, commentData]) => ({
          id: commentId,
          ...commentData,
        }));

        return postCommentsArray;
      } catch (error) {
        console.error('Error retrieving comments:', error);
        throw error;
      }
    },
  },
};

module.exports = CommentsQuery;