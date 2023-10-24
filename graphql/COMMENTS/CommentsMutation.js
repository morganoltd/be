const { db } = require("../../firebase/firebase");

function formatCreatedAt(date) {
  return date.toISOString();
}

const CommentsMutation = {
  Mutation: {
    addComment: async (_, { userID, postID, commentText }) => {
      try {
        const usersCollection = db.collection("USERS");
        const usersSnapshot = await usersCollection.get();

        for (const userDoc of usersSnapshot.docs) {
          const userRef = userDoc.ref;
          const postRef = userRef.collection("POSTS").doc(postID);

          const postDoc = await postRef.get();

          if (postDoc.exists) {
            const commentCreatedAt = formatCreatedAt(new Date());

            const commentsRef = postRef.collection("COMMENTS");

            const commentID = commentsRef.doc().id;

            await commentsRef.doc(commentID).set({
              userID,
              text: commentText,
              likes: 0,
              createdAt: commentCreatedAt,
              commentID,
            });

            const commentResponse = {
              userID,
              text: commentText,
              likes: 0,
              createdAt: commentCreatedAt,
              commentID,
            };

            return commentResponse;
          }
        }

        throw new Error("Post does not exist");
      } catch (error) {
        console.error("Error adding comment:", error);
        throw new Error(
          "An error occurred while adding the comment: " + error.message
        );
      }
    },
    deleteComment: async (_, { commentID }) => {
      try {
        const commentsCollection = db.collectionGroup("COMMENTS");
        const commentQuery = commentsCollection
          .where("commentID", "==", commentID)
          .limit(1);

        const commentSnapshot = await commentQuery.get();

        if (!commentSnapshot.empty) {
          const commentDoc = commentSnapshot.docs[0];
          await commentDoc.ref.delete();
          return true;
        } else {
          throw new Error("Comment does not exist");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        throw new Error(
          "An error occurred while deleting the comment: " + error.message
        );
      }
    },
    updateComment: async (_, { commentID, commentText }) => {
      try {
        const commentsCollection = db.collectionGroup("COMMENTS");
        const commentQuery = commentsCollection
          .where("commentID", "==", commentID)
          .limit(1);

        const commentSnapshot = await commentQuery.get();

        if (!commentSnapshot.empty) {
          const commentDoc = commentSnapshot.docs[0];

          await commentDoc.ref.update({ text: commentText });

          return true;
        } else {
          throw new Error("Comment does not exist");
        }
      } catch (error) {
        console.error("Error updating comment:", error);
        throw new Error(
          "An error occurred while updating the comment: " + error.message
        );
      }
    },
    likeComment: async (_, { commentID }) => {
      try {
        console.log("Attempting to like comment with commentID:", commentID);

        const commentsCollection = db.collectionGroup("COMMENTS");
        const commentQuery = commentsCollection
          .where("commentID", "==", commentID)
          .limit(1);

        const commentSnapshot = await commentQuery.get();

        if (!commentSnapshot.empty) {
          const commentDoc = commentSnapshot.docs[0];
          const commentData = commentDoc.data();
          console.log("Found comment with data:", commentData);

          const { userID, postID } = commentData;

          await commentDoc.ref.update({ likes: commentData.likes + 1 });

          return true;
        } else {
          console.error("Comment does not exist");
          throw new Error("Comment does not exist");
        }
      } catch (error) {
        console.error("Error liking comment:", error);
        throw new Error("An error occurred while liking the comment");
      }
    },
    unlikeComment: async (_, { commentID }) => {
      try {
        console.log("Attempting to unlike comment with commentID:", commentID);

        const commentsCollection = db.collectionGroup("COMMENTS");
        const commentQuery = commentsCollection
          .where("commentID", "==", commentID)
          .limit(1);

        const commentSnapshot = await commentQuery.get();

        if (!commentSnapshot.empty) {
          const commentDoc = commentSnapshot.docs[0];
          const commentData = commentDoc.data();
          console.log("Found comment with data:", commentData);

          const { userID, postID } = commentData;

          await commentDoc.ref.update({ likes: commentData.likes - 1 });

          return true;
        } else {
          console.error("Comment does not exist");
          throw new Error("Comment does not exist");
        }
      } catch (error) {
        console.error("Error unliking comment:", error);
        throw new Error("An error occurred while unliking the comment");
      }
    },
  },
};

module.exports = CommentsMutation;
