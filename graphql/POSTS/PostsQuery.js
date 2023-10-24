const { db } = require('../../firebase/firebase');

const PostsQuery = {
  Query: {
    All_Posts: async () => {
      try {
        const querySnapshot = await db.collectionGroup('POSTS').get();
        const posts = querySnapshot.docs.map(doc => {
          const post = doc.data();
          post.id = doc.id;
          return post;
        });
        return posts;
      } catch (error) {
        console.error('Error retrieving posts:', error);
        return [];
      }
    },
    get_all_user_posts: async (_, { username }) => {
      try {
        const userPostsRef = db.collection('USERS').doc(username).collection('POSTS');
        const querySnapshot = await userPostsRef.get();

        if (querySnapshot.empty) {
          console.log('No posts found for this user.');
          return [];
        }

        const posts = querySnapshot.docs.map(doc => {
          const post = doc.data();
          post.id = doc.id;
          return post;
        });

        return posts;
      } catch (error) {
        console.error('Error retrieving posts:', error);
        return [];
      }
    },
    get_user_post: async (_, { postId }) => {
      try {
        const userDocs = await db.collection('USERS').get();
    
        for (const userDoc of userDocs.docs) {
          const userRef = userDoc.ref;
          const postRef = userRef.collection('POSTS').doc(postId);
    
          const postDoc = await postRef.get();
    
          if (postDoc.exists) {
            const post = postDoc.data();
            post.id = postDoc.id;
    
            return post; 
          }
        }
    
        console.log('Post not found.');
        return null; 
      } catch (error) {
        console.error('Error retrieving post:', error);
        return null;
      }
    },
    getPostsByGame: async (_, { game }) => {
      try {
        const querySnapshot = await db.collectionGroup('POSTS')
          .where('utils.games', 'array-contains', game)
          .get();

        const posts = querySnapshot.docs.map(doc => {
          const post = doc.data();
          post.id = doc.id;
          return post;
        });

        return posts;
      } catch (error) {
        console.error('Error retrieving posts by game:', error);
        return [];
      }
    },
  },
};

module.exports = PostsQuery;
