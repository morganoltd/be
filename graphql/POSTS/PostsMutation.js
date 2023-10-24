const { db } = require('../../firebase/firebase');
const { v4: uuidv4 } = require('uuid');

function formatCreatedAt(date) {
  return date.toISOString();
}

const PostsMutation = {
    Mutation: {
        addPost: async (_, args) => {
            try {
                const {
                    id,
                    games,
                    format,
                    email,
                    hashtag,
                    username,
                    title,
                    backgroundFilter,
                    selectedBackground,
                    likes,
                    views,
                    selectedSticker,
                    stickerFilter,
                    stickerMargin,
                    stickerWidth,
                    stickerPostMargin,
                    stickerPostWidth,
                    titleMarginHor,
                    titleMarginVer,
                    titleFont,
                    titleFontSize,
                    titleColor,
                    titleStyle,
                    titleShadow,
                    titleLetter,
                    titleWeight,
                    titleItalic,
                    titleUnderline,
                    titleBreak,
                    titleAlign,
                    titleHeight,
                    titleSpacing,
                    titlePostFontSize,
                    titlePostMarginHor,
                    titlePostMarginVer,
                    titlePostBreak,
                    titlePostSpacing,
                    titlePostHeight,
                    titlePostAlign,
                } = args;

                const userRef = db.collection('USERS').doc(username);
                const userSnapshot = await userRef.get();

                if (!userSnapshot.exists) {
                    throw new Error('User not found. Please create the user first.');
                }

                if (!title || title.trim() === '') {
                    throw new Error('Post title cannot be empty.');
                }

                const lowercaseGames = games.map(game => game.toLowerCase());

                const validGamesSnapshot = await db.collection('GAMES')
                    .where('id', 'in', lowercaseGames)
                    .get();

                const validGames = validGamesSnapshot.docs.map(doc => doc.data().id);

                if (validGames.length !== games.length) {
                    throw new Error('Some provided games do not exist in the GAMES collection.');
                }

                const allowedFormats = ["article", "video", "images", "entry"];
                if (!allowedFormats.includes(format)) {
                    throw new Error('Invalid format. Allowed formats: "article", "video", "images", "entry".');
                }

                const postCreatedAt = formatCreatedAt(new Date());

                const postId = uuidv4();

                const newPost = {
                    utils: {
                        id: postId,
                        published: true,
                        games: validGames,
                        format,
                        email,
                        createdAt: postCreatedAt,
                    },
                    titlePost: {
                        titlePostSpacing: titlePostSpacing || 0,
                        titlePostMarginVer: titlePostMarginVer || 0,
                        titlePostMarginHor: titlePostMarginHor || 0,
                        titlePostHeight: titlePostHeight || 0,
                        titlePostFontSize: titlePostFontSize || 0,
                        titlePostBreak: titlePostBreak || 0,
                        titlePostAlign: titlePostAlign || "",
                    },
                    title: {
                        titleWeight: titleWeight || "",
                        titleUnderline: titleUnderline || "",
                        titleStyle: titleStyle || "",
                        titleSpacing: titleSpacing || 0,
                        titleShadow: titleShadow || "",
                        titleMarginVer: titleMarginVer || 0,
                        titleMarginHor: titleMarginHor || 0,
                        titleLetter: titleLetter || "",
                        titleItalic: titleItalic || "",
                        titleHeight: titleHeight || 0,
                        titleFont: titleFont || "",
                        titleFontSize: titleFontSize || 0,
                        titleColor: titleColor || "",
                        titleBreak: titleBreak || 0,
                        titleAlign: titleAlign || "",
                        title,
                    },
                    stickerPost: {
                        stickerPostWidth: stickerPostWidth || 0,
                        stickerPostMargin: stickerPostMargin || 0,
                    },
                    sticker: {
                        stickerWidth: stickerWidth || 0,
                        stickerMargin: stickerMargin || 0,
                        stickerFilter: stickerFilter || "",
                        selectedSticker: selectedSticker || "",
                    },
                    postFooter: {
                        views: views || 0,
                        username,
                        likes: likes || 0,
                        hashtag,
                    },
                    background: {
                        selectedBackground: selectedBackground || "",
                        backgroundFilter: backgroundFilter || "",
                    },
                };

                await userRef.collection('POSTS').doc(postId).set(newPost);

                return newPost;
            } catch (error) {
                console.error('Error adding post:', error);
                throw new Error('An error occurred while adding the post');
            }
        },
        incrementPostViews: async (_, { postId }) => {
            try {
              const userDocs = await db.collection('USERS').get();
      
              for (const userDoc of userDocs.docs) {
                const userRef = userDoc.ref;
                const postRef = userRef.collection('POSTS').doc(postId);
      
                const postDoc = await postRef.get();
      
                if (postDoc.exists) {
                  const updatedViews = postDoc.data().postFooter.views + 1;
                  await postRef.update({ 'postFooter.views': updatedViews });
      
                  const updatedPost = (await postRef.get()).data();
                  updatedPost.id = postDoc.id;
                  return updatedPost;
                }
              }
      
              console.log('Post not found.');
              return null;
            } catch (error) {
              console.error('Błąd podczas zwiększania wyświetleń posta:', error);
              throw new Error('Wystąpił błąd podczas zwiększania wyświetleń posta');
            }
          },
          likePost: async (_, { postId }) => {
            try {
              const userDocs = await db.collection('USERS').get();
      
              for (const userDoc of userDocs.docs) {
                const userRef = userDoc.ref;
                const postRef = userRef.collection('POSTS').doc(postId);
      
                const postDoc = await postRef.get();
      
                if (postDoc.exists) {
                  const updatedLikes = postDoc.data().postFooter.likes + 1;
                  await postRef.update({ 'postFooter.likes': updatedLikes });
      
                  const updatedPost = (await postRef.get()).data();
                  updatedPost.id = postDoc.id;
                  return updatedPost;
                }
              }
      
              console.log('Post not found.');
              return null;
            } catch (error) {
              console.error('Błąd podczas polubienia posta:', error);
              throw new Error('Wystąpił błąd podczas polubienia posta');
            }
          },
          unlikePost: async (_, { postId }) => {
            try {
              const userDocs = await db.collection('USERS').get();
          
              for (const userDoc of userDocs.docs) {
                const userRef = userDoc.ref;
                const postRef = userRef.collection('POSTS').doc(postId);
          
                const postDoc = await postRef.get();
          
                if (postDoc.exists) {
                  const updatedLikes = postDoc.data().postFooter.likes - 1;
                  await postRef.update({ 'postFooter.likes': updatedLikes });
          
                  const updatedPost = (await postRef.get()).data();
                  updatedPost.id = postDoc.id;
                  return updatedPost;
                }
              }
          
              console.log('Post not found.');
              return null;
            } catch (error) {
              console.error('Błąd podczas anulowania polubienia posta:', error);
              throw new Error('Wystąpił błąd podczas anulowania polubienia posta');
            }
          },          
    },
};

module.exports = PostsMutation;