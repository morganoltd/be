const { db } = require('../../firebase/firebase');

// Custom function to format the date as "DD/MM/YYYY hh:mm:ssAM/PM"
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


const PostsMutation = {
    Mutation: {
        addPost: async (_, { username, postTitle, text, hashtag, games }) => {
            try {
                // Ensure the user exists before adding a post
                const userRef = db.collection('USERS').doc(username);
                const userSnapshot = await userRef.get();

                if (!userSnapshot.exists) {
                    throw new Error('User not found. Please create the user first.');
                }

                if (!postTitle || postTitle.trim() === '') {
                    throw new Error('Post title cannot be empty.');
                }

                const title = postTitle.replace(/\s+/g, '_');

                const formattedHashtag = "#" + hashtag;

                // Convert game IDs to lowercase for case-insensitive comparison
                const lowercaseGames = games.map(game => game.toLowerCase());

                // Check if the provided games exist in the "GAMES" collection
                const validGamesSnapshot = await db.collection('GAMES')
                    .where('id', 'in', lowercaseGames)
                    .get();

                const validGames = validGamesSnapshot.docs.map(doc => doc.data().id);

                if (validGames.length !== games.length) {
                    throw new Error('Some provided games do not exist in the GAMES collection.');
                }

                const postCreatedAt = formatCreatedAt(new Date());

                const newPost = {
                    title: title,
                    text: text,
                    createdAt: postCreatedAt,
                    likes: 0,
                    views: 0,
                    hashtag: formattedHashtag,
                    tags: [],
                    games: validGames,
                    store: {
                        bg: "",
                        game: "",
                    },
                    photos: {
                        firstphoto: {
                            url: "",
                            description: "",
                        },
                        secondphoto: {
                            url: "",
                            description: "",
                        },
                    },
                    videos: {
                        firstvideo: {
                            url: "",
                            description: "",
                        },
                        secondvideo: {
                            url: "",
                            description: "",
                        },
                    },
                    styles: {
                        fontTitle: "",
                        fontText: "",
                        positionTitle: "",
                        positonText: "",
                    },
                };

                const postId = `${title}-${username}-${postCreatedAt.replace(/[\/\s+]/g, '-').replace(/\./g, '-')}`;

                // Add the new post as a subcollection under the user's document
                await userRef.collection('POSTS').doc(postId).set(newPost);

                return newPost;
            } catch (error) {
                console.error('Error adding post:', error);
                throw new Error('An error occurred while adding the post');
            }
        },
    },
};

module.exports = PostsMutation;