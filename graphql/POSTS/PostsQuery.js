const { db } = require('../../firebase/firebase');

const PostsQuery = {
  Query: {
    All_Posts: async () => {
      try {
        const querySnapshot = await db.collectionGroup('POSTS').get();
        const posts = querySnapshot.docs.map(doc => {
          const post = doc.data();
          post.id = doc.id; // Add the post ID to the post object
          return post;
        });
        return posts;
      } catch (error) {
        console.error('Error retrieving posts:', error);
        return [];
      }
    },
    get_user_posts: async (_, { username }) => {
      try {
        const userPostsRef = db.collection('USERS').doc(username).collection('POSTS');
        const querySnapshot = await userPostsRef.get();

        if (querySnapshot.empty) {
          console.log('No posts found for this user.');
          return [];
        }

        const posts = querySnapshot.docs.map(doc => {
          const post = doc.data();
          // Add the post ID to the post object
          post.id = doc.id;
          return post;
        });

        return posts;
      } catch (error) {
        console.error('Error retrieving posts:', error);
        return [];
      }
    }
  },
};

module.exports = PostsQuery;