const admin = require('firebase-admin');

const dbFirestore = admin.firestore();
const dbRealtime = admin.database();

function formatCreatedAt(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = (hours % 12) || 12;

  const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds}${ampm}`;

  return formattedDate;
}

const CommentsMutation = {
  Mutation: {
    addComment: async (_, { username, title, text }) => {
      try {
        // Check if the post exists in Firestore
        const usersSnapshot = await dbFirestore.collection('USERS').get();

        for (const userDoc of usersSnapshot.docs) {
          const userID = userDoc.id;

          const postRef = dbFirestore.collection('USERS').doc(userID).collection('POSTS').doc(title);
          const postSnapshot = await postRef.get();

          if (postSnapshot.exists) {
            // If the post exists, proceed to add the comment to the Realtime Database
            const commentsRef = dbRealtime.ref('COMMENTS').child(title);
            const newCommentRef = commentsRef.push(); // Automatically generate a new unique ID for the comment
            const createdAt = formatCreatedAt(new Date());

            await newCommentRef.set({
              text: text,
              likes: 0,
              createdAt: createdAt,
              username: username,
            });

            return {
              text: text,
              likes: 0,
              createdAt: createdAt,
              username: username,
            };
          }
        }

        // If the post doesn't exist in any user's subcollection, throw an error
        throw new Error(`Post with title "${title}" does not exist in Firestore.`);

      } catch (error) {
        // Handle any errors that may occur during the process.
        console.error("Error adding comment:", error);
        throw error;
      }
    },
  },
};

module.exports = CommentsMutation;