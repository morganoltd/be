const { db } = require("../../firebase/firebase");
const { v4: uuidv4 } = require("uuid");

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
          published,
          title,
          selectedBackground,
          selectedBackgroundTitle,
          backgroundColor,
          likes,
          views,
          selectedSticker,
          selectedStickerTitle,
          stickerBlack,
          stickerOpacity,
          stickerReverse,
          stickerMarginHor,
          stickerMarginVer,
          stickerWidth,
          stickerPostMarginHor,
          stickerPostMarginVer,
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
          text,
          textMarginHor,
          textMarginVer,
          textFont,
          textFontSize,
          textColor,
          textStyle,
          textShadow,
          textLetter,
          textWeight,
          textItalic,
          textUnderline,
          textBreak,
          textAlign,
          textHeight,
          textSpacing,
          newTextSections,
          headSections,
          selectedVideo,
          nameVideo,
          videoPlayer,
          videoTitle,
          videoSize,
          videoColor,
          videoColorBackground,
          videoMarginHor,
          videoMarginVer,
          selectedImages,
          nameImages,
          imagesSize,
          imagesSlider,
          imagesPadding,
          imagesMarginHor,
          imagesMarginVer,
          imagesBorder,
          imagesBorderRadius,
          imagesShadow,
          imagesColor,
          imagesEffectSize,
          imagesEffectBlack,
          imagesEffectShadow,
          entry,
          entryFont,
          entrySize,
          entryMarginHor,
          entryMarginVer,
          entryColor,
          entryColorAvatar,
          entryLetter,
          entryAlign,
          entryWeight,
          entryItalic,
          entryUnderline,
          entryBreak,
          entrySpacing,
          entryHeight,
        } = args;

        const userRef = db.collection("USERS").doc(username);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          throw new Error("User not found. Please create the user first.");
        }

        const lowercaseGames = games.map((game) => game.toLowerCase());

        const validGamesSnapshot = await db
          .collection("GAMES")
          .where("id", "in", lowercaseGames)
          .get();

        const validGames = validGamesSnapshot.docs.map((doc) => doc.data().id);

        if (validGames.length !== games.length) {
          throw new Error(
            "Some provided games do not exist in the GAMES collection."
          );
        }

        const allowedFormats = ["article", "video", "images", "entry"];
        if (!allowedFormats.includes(format)) {
          throw new Error(
            'Invalid format. Allowed formats: "article", "video", "images", "entry".'
          );
        }

        const postCreatedAt = formatCreatedAt(new Date());

        const postId = uuidv4();

        const newPost = {
          utils: {
            id: postId,
            published,
            games: validGames,
            format,
            email,
            createdAt: postCreatedAt,
          },
          entry: {
            entry: entry || "",
            entryFont: entryFont || "",
            entrySize: entrySize || 0,
            entryMarginHor: entryMarginHor || 0,
            entryMarginVer: entryMarginVer || 0,
            entryColor: entryColor || "",
            entryColorAvatar: entryColorAvatar || "",
            entryLetter: entryLetter || "",
            entryAlign: entryAlign || "",
            entryWeight: entryWeight || "",
            entryItalic: entryItalic || "",
            entryUnderline: entryUnderline || "",
            entryBreak: entryBreak || 0,
            entrySpacing: entrySpacing || 0,
            entryHeight: entryHeight || 0,
          },
          images: {
            selectedImages: selectedImages || [],
            nameImages: nameImages || [],
            imagesSize: imagesSize || [],
            imagesSlider: imagesSlider || "",
            imagesPadding: imagesPadding || 0,
            imagesMarginHor: imagesMarginHor || 0,
            imagesMarginVer: imagesMarginVer || 0,
            imagesBorder: imagesBorder || "",
            imagesBorderRadius: imagesBorderRadius || 0,
            imagesShadow: imagesShadow || "",
            imagesColor: imagesColor || "",
            imagesEffectSize: imagesEffectSize || "",
            imagesEffectBlack: imagesEffectBlack || "",
            imagesEffectShadow: imagesEffectShadow || "",
          },
          video: {
            selectedVideo: selectedVideo || "",
            nameVideo: nameVideo || "",
            videoPlayer: videoPlayer || "",
            videoTitle: videoTitle || "",
            videoSize: videoSize || 0,
            videoColor: videoColor || "",
            videoColorBackground: videoColorBackground || "",
            videoMarginHor: videoMarginHor || 0,
            videoMarginVer: videoMarginVer || 0,
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
          text: {
            text: text || "",
            textMarginHor: textMarginHor || 0,
            textMarginVer: textMarginVer || 0,
            textFont: textFont || "",
            textFontSize: textFontSize || 0,
            textColor: textColor || "",
            textStyle: textStyle || "",
            textShadow: textShadow || "",
            textLetter: textLetter || "",
            textWeight: textWeight || "",
            textItalic: textItalic || "",
            textUnderline: textUnderline || "",
            textBreak: textBreak || 0,
            textAlign: textAlign || "",
            textHeight: textHeight || 0,
            textSpacing: textSpacing || 0,
          },
          stickerPost: {
            stickerPostWidth: stickerPostWidth || 0,
            stickerPostMarginHor: stickerPostMarginHor || 0,
            stickerPostMarginVer: stickerPostMarginVer || 0,
          },
          sticker: {
            stickerWidth: stickerWidth || 0,
            stickerMarginHor: stickerMarginHor || 0,
            stickerMarginVer: stickerMarginVer || 0,
            stickerBlack: stickerBlack || "",
            stickerOpacity: stickerOpacity || 1,
            stickerReverse: stickerReverse || 1,
            selectedSticker: selectedSticker || "",
            selectedStickerTitle: selectedStickerTitle || "",
          },
          postFooter: {
            views: views || 0,
            username,
            likes: likes || 0,
            hashtag,
          },
          background: {
            selectedBackground: selectedBackground || "",
            selectedBackgroundTitle: selectedBackgroundTitle || "",
            backgroundColor: backgroundColor || "",
          },
          newTextSections: newTextSections || [],
          headSections: headSections || [],
        };

        await userRef.collection("POSTS").doc(postId).set(newPost);

        return newPost;
      } catch (error) {
        console.error("Error adding post:", error);
        throw new Error("An error occurred while adding the post");
      }
    },
    incrementPostViews: async (_, { postId }) => {
      try {
        const userDocs = await db.collection("USERS").get();

        for (const userDoc of userDocs.docs) {
          const userRef = userDoc.ref;
          const postRef = userRef.collection("POSTS").doc(postId);

          const postDoc = await postRef.get();

          if (postDoc.exists) {
            const updatedViews = postDoc.data().postFooter.views + 1;
            await postRef.update({ "postFooter.views": updatedViews });

            const updatedPost = (await postRef.get()).data();
            updatedPost.id = postDoc.id;
            return updatedPost;
          }
        }

        console.log("Post not found.");
        return null;
      } catch (error) {
        console.error("Błąd podczas zwiększania wyświetleń posta:", error);
        throw new Error("Wystąpił błąd podczas zwiększania wyświetleń posta");
      }
    },
    likePost: async (_, { postId }) => {
      try {
        const userDocs = await db.collection("USERS").get();

        for (const userDoc of userDocs.docs) {
          const userRef = userDoc.ref;
          const postRef = userRef.collection("POSTS").doc(postId);

          const postDoc = await postRef.get();

          if (postDoc.exists) {
            const updatedLikes = postDoc.data().postFooter.likes + 1;
            await postRef.update({ "postFooter.likes": updatedLikes });

            const updatedPost = (await postRef.get()).data();
            updatedPost.id = postDoc.id;
            return updatedPost;
          }
        }

        console.log("Post not found.");
        return null;
      } catch (error) {
        console.error("Błąd podczas polubienia posta:", error);
        throw new Error("Wystąpił błąd podczas polubienia posta");
      }
    },
    unlikePost: async (_, { postId }) => {
      try {
        const userDocs = await db.collection("USERS").get();

        for (const userDoc of userDocs.docs) {
          const userRef = userDoc.ref;
          const postRef = userRef.collection("POSTS").doc(postId);

          const postDoc = await postRef.get();

          if (postDoc.exists) {
            const updatedLikes = postDoc.data().postFooter.likes - 1;
            await postRef.update({ "postFooter.likes": updatedLikes });

            const updatedPost = (await postRef.get()).data();
            updatedPost.id = postDoc.id;
            return updatedPost;
          }
        }

        console.log("Post not found.");
        return null;
      } catch (error) {
        console.error("Błąd podczas anulowania polubienia posta:", error);
        throw new Error("Wystąpił błąd podczas anulowania polubienia posta");
      }
    },
  },
};

module.exports = PostsMutation;
