const { db, firebaseAuth } = require("../../firebase/firebase");
const validCountries = require("./validCountries");

function formatCreatedAt(date) {
  return date.toISOString();
}

const createAchievementsSubcollection = async (userId, taskPackId) => {
  try {
    const tasksRef = db
      .collection("ACHIEVEMENTS")
      .doc(taskPackId)
      .collection("TASKS");
    const tasksSnapshot = await tasksRef.get();
    const userProgressRef = db
      .collection("USERS")
      .doc(userId)
      .collection("ACHIEVEMENTS");

    // Create documents in the new subcollection with an empty array for the "progress" field
    tasksSnapshot.forEach(async (taskDoc) => {
      const userProgressDocRef = userProgressRef.doc(taskDoc.id);

      await userProgressDocRef.set({
        progress: [],
        taskPackId: taskPackId,
        taskId: taskDoc.id,
      });
    });

    console.log(
      `Progress subcollection created for user ${userId} based on taskPack ${taskPackId}`
    );
  } catch (error) {
    console.error("Error creating progress subcollection:", error);
    throw new Error(
      `An error occurred while creating the progress subcollection: ${error.message}`
    );
  }
};

const UserMutation = {
  Mutation: {
    addUser: async (_, { username, password, games, email, country }) => {
      try {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          throw new Error("Invalid email format.");
        }
        if (!validCountries.includes(country)) {
          throw new Error("Invalid country.");
        }
        if (games.length < 5) {
          throw new Error("At least 5 games are required.");
        }

        const createdAt = formatCreatedAt(new Date());
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

        const userCredential =
          await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        await db
          .collection("USERS")
          .doc(username)
          .set({
            account: {
              uid: uid,
              username: username,
              createdAt: createdAt,
              email: email,
              country: country,
              role: "user",
            },
            profile: {
              avatar: "",
              billboard: "",
              games: validGames,
              topGames: ["", "", "", "", ""],
              views: [],
              subbedBy: [],
              subbedTo: [],
              likedPosts: [],
              likedComments: [],
              social: {
                facebook: "",
                x: "",
                youtube: "",
                twitch: "",
              },
              achievements: {
                accepted: [],
                finished: [],
              },
              premium: {
                backgrounds: [],
                fonts: [],
                sliders: [],
                players: [],
                avatars: [],
                stickers: [],
                billboards: [],
                colors: [],
              },
            },
          });

        return {
          account: {
            uid: uid,
            username: username,
            createdAt: createdAt,
            email: email,
            country: country,
            role: "user",
          },
          profile: {
            avatar: "",
            billboard: "",
            games: validGames,
            topGames: ["", "", "", "", ""],
            views: [],
            subbedBy: [],
            subbedTo: [],
            likedPosts: [],
            likedComments: [],
            social: {
              facebook: "",
              twitter: "",
              youtube: "",
            },
            achievements: {
              accepted: [],
              finished: [],
            },
            premium: {
              backgrounds: [],
              fonts: [],
              sliders: [],
              players: [],
              avatars: [],
              stickers: [],
              billboards: [],
              colors: [],
            },
          },
        };
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("An error occurred while adding the user");
      }
    },

    addUserGame: async (_, { userId, gameId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedGames = [...userData.profile.games, gameId];

        await userRef.update({
          "profile.games": updatedGames,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            games: updatedGames,
          },
        };
      } catch (error) {
        console.error("Error adding user game:", error);
        throw new Error("An error occurred while adding the game");
      }
    },
    deleteUserGame: async (_, { userId, gameId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedGames = userData.profile.games.filter(
          (game) => game !== gameId
        );

        await userRef.update({
          "profile.games": updatedGames,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            games: updatedGames,
          },
        };
      } catch (error) {
        console.error("Error deleting user game:", error);
        throw new Error("An error occurred while deleting the game");
      }
    },
    addLikedPost: async (_, { userId, postId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedLikedPosts = [...userData.profile.likedPosts, postId];

        await userRef.update({
          "profile.likedPosts": updatedLikedPosts,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedPosts: updatedLikedPosts,
          },
        };
      } catch (error) {
        console.error("Error adding liked post:", error);
        throw new Error("An error occurred while adding the liked post");
      }
    },
    deleteLikedPost: async (_, { userId, postId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedLikedPosts = userData.profile.likedPosts.filter(
          (likedPostId) => likedPostId !== postId
        );

        await userRef.update({
          "profile.likedPosts": updatedLikedPosts,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedPosts: updatedLikedPosts,
          },
        };
      } catch (error) {
        console.error("Error deleting liked post:", error);
        throw new Error("An error occurred while deleting the liked post");
      }
    },
    addViewedPost: async (_, { userId, postId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedViewedPosts = [...userData.profile.views, postId];

        await userRef.update({
          "profile.views": updatedViewedPosts,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            views: updatedViewedPosts,
          },
        };
      } catch (error) {
        console.error("Error adding viewed post:", error);
        throw new Error("An error occurred while adding the viewed post");
      }
    },
    addLikedComment: async (_, { userId, commentID }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedLikedComments = [
          ...userData.profile.likedComments,
          commentID,
        ];

        await userRef.update({
          "profile.likedComments": updatedLikedComments,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedComments: updatedLikedComments,
          },
        };
      } catch (error) {
        console.error("Error adding liked comment:", error);
        throw new Error("An error occurred while adding the liked comment");
      }
    },

    deleteLikedComment: async (_, { userId, commentID }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const updatedLikedComments = userData.profile.likedComments.filter(
          (likedCommentId) => likedCommentId !== commentID
        );

        await userRef.update({
          "profile.likedComments": updatedLikedComments,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedComments: updatedLikedComments,
          },
        };
      } catch (error) {
        console.error("Error deleting liked comment:", error);
        throw new Error("An error occurred while deleting the liked comment");
      }
    },
    updateUserData: async (_, { userId, input }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();

        if (input.username) {
          const newUsername = input.username;
          userData.account.username = newUsername;

          const newUserRef = db.collection("USERS").doc(newUsername);
          await newUserRef.set(userData);
          await userRef.delete();

          userId = newUsername;
        }
        if (input.country && validCountries.includes(input.country)) {
          userData.account.country = input.country;
        }

        const profileFields = ["avatar", "billboard", "social"];
        profileFields.forEach((field) => {
          if (input[field] !== undefined) {
            if (field === "social") {
              userData.profile[field] = {
                ...userData.profile[field],
                ...input[field],
              };
            } else {
              userData.profile[field] = input[field];
            }
          }
        });

        await userRef.update({
          account: userData.account,
          profile: userData.profile,
        });

        return {
          account: userData.account,
          profile: userData.profile,
          userId,
        };
      } catch (error) {
        console.error("Error updating user data:", error);
        throw new Error("An error occurred while updating user data");
      }
    },
    updateUserEmail: async (_, { userId, newEmail }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();

        const currentUser = firebaseAuth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        await currentUser.updateEmail(newEmail);

        await userRef.update({
          "account.email": newEmail,
        });

        return {
          account: {
            ...userData.account,
            email: newEmail,
          },
          profile: userData.profile,
        };
      } catch (error) {
        console.error("Error updating user email:", error);
        throw new Error("An error occurred while updating user email");
      }
    },
    updateUserPassword: async (_, { userId, newPassword }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();

        const currentUser = firebaseAuth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        await currentUser.updatePassword(newPassword);

        return {
          account: userData.account,
          profile: userData.profile,
        };
      } catch (error) {
        console.error("Error updating user password:", error);
        throw new Error("An error occurred while updating user password");
      }
    },
    // acceptAchievements: async (_, { userId, achievementId }) => {
    //   try {
    //     const userRef = db.collection('USERS').doc(userId);
    //     const userDoc = await userRef.get();

    //     if (!userDoc.exists) {
    //       throw new Error('User not found');
    //     }

    //     const userData = userDoc.data();
    //     const updatedAcceptedAchievements = [...userData.profile.acceptedAchievements, achievementId];

    //     await userRef.update({
    //       'profile.acceptedAchievements': updatedAcceptedAchievements,
    //     });

    //     return {
    //       account: userData.account,
    //       profile: {
    //         ...userData.profile,
    //         acceptedAchievements: updatedAcceptedAchievements,
    //       },
    //     };
    //   } catch (error) {
    //     console.error('Error accepting achievement:', error);
    //     throw new Error('An error occurred while accepting the achievement');
    //   }
    // },

    // finishAchievements: async (_, { userId, achievementId }) => {
    //   try {
    //     const userRef = db.collection('USERS').doc(userId);
    //     const userDoc = await userRef.get();

    //     if (!userDoc.exists) {
    //       throw new Error('User not found');
    //     }

    //     const userData = userDoc.data();
    //     const { acceptedAchievements, finishedAchievements } = userData.profile;

    //     if (!acceptedAchievements.includes(achievementId)) {
    //       throw new Error('Achievement not found in accepted list');
    //     }

    //     // Move achievement from accepted to finished
    //     const updatedAcceptedAchievements = acceptedAchievements.filter(id => id !== achievementId);
    //     const updatedFinishedAchievements = [...finishedAchievements, achievementId];

    //     await userRef.update({
    //       'profile.acceptedAchievements': updatedAcceptedAchievements,
    //       'profile.finishedAchievements': updatedFinishedAchievements,
    //     });

    //     return {
    //       account: userData.account,
    //       profile: {
    //         ...userData.profile,
    //         acceptedAchievements: updatedAcceptedAchievements,
    //         finishedAchievements: updatedFinishedAchievements,
    //       },
    //     };
    //   } catch (error) {
    //     console.error('Error finishing achievement:', error);
    //     throw new Error('An error occurred while finishing the achievement');
    //   }
    // },

    subscribeUser: async (_, { userId, targetUserId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const targetUserRef = db.collection("USERS").doc(targetUserId);

        const [userDoc, targetUserDoc] = await Promise.all([
          userRef.get(),
          targetUserRef.get(),
        ]);

        if (!userDoc.exists || !targetUserDoc.exists) {
          throw new Error("User or target user not found");
        }

        const userData = userDoc.data();
        const targetUserData = targetUserDoc.data();

        const updatedSubbedTo = [...userData.profile.subbedTo, targetUserId];

        await userRef.update({
          "profile.subbedTo": updatedSubbedTo,
        });

        const updatedSubbedBy = [...targetUserData.profile.subbedBy, userId];
        await targetUserRef.update({
          "profile.subbedBy": updatedSubbedBy,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            subscriptions: {
              ...userData.profile,
              subbedTo: updatedSubbedTo,
            },
          },
        };
      } catch (error) {
        console.error("Error subscribing to the user:", error);
        throw new Error("An error occurred while subscribing to the user");
      }
    },
    unsubscribeUser: async (_, { userId, targetUserId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const targetUserRef = db.collection("USERS").doc(targetUserId);

        const [userDoc, targetUserDoc] = await Promise.all([
          userRef.get(),
          targetUserRef.get(),
        ]);

        if (!userDoc.exists || !targetUserDoc.exists) {
          throw new Error("User or target user not found");
        }

        const userData = userDoc.data();
        const targetUserData = targetUserDoc.data();

        const updatedSubbedTo = userData.profile.subbedTo.filter(
          (id) => id !== targetUserId
        );

        await userRef.update({
          "profile.subbedTo": updatedSubbedTo,
        });

        const updatedSubbedBy = targetUserData.profile.subbedBy.filter(
          (id) => id !== userId
        );
        await targetUserRef.update({
          "profile.subbedBy": updatedSubbedBy,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            subscriptions: {
              ...userData.profile,
              subbedTo: updatedSubbedTo,
            },
          },
        };
      } catch (error) {
        console.error("Error unsubscribing user:", error);
        throw new Error("An error occurred while unsubscribing the user");
      }
    },

    deleteUser: async (_, { userId }) => {
      try {
        // Step 1: Remove the user from other users' subbedTo arrays and subbedBy arrays
        const usersToUpdate = await db.collection("USERS").get();

        const batch = db.batch();

        usersToUpdate.forEach((userDoc) => {
          const otherUserId = userDoc.id;
          const otherUserRef = db.collection("USERS").doc(otherUserId);

          // Update subbedTo array
          const updatedSubbedTo = (
            userDoc.data().profile.subbedTo || []
          ).filter((id) => id !== userId);
          batch.update(otherUserRef, { "profile.subbedTo": updatedSubbedTo });

          // Update subbedBy array
          const updatedSubbedBy = (
            userDoc.data().profile.subbedBy || []
          ).filter((id) => id !== userId);
          batch.update(otherUserRef, { "profile.subbedBy": updatedSubbedBy });
        });

        // Execute batched writes
        await batch.commit();

        // Step 2: Delete Subcollections
        const subcollectionNames = ["POSTS", "ACHIEVEMENTS", "ALERTS"];

        const userRef = db.collection("USERS").doc(userId);
        await Promise.all(
          subcollectionNames.map(async (subcollectionName) => {
            const querySnapshot = await userRef
              .collection(subcollectionName)
              .get();

            querySnapshot.forEach(async (doc) => {
              await doc.ref.delete();
            });
          })
        );

        // Step 3: Delete the main user document
        await new Promise((resolve) => setTimeout(resolve, 500));
        await userRef.delete();

        // Step 4: Remove the user from Firebase Auth
        await new Promise((resolve) => setTimeout(resolve, 500));
        const currentUser = firebaseAuth.currentUser;

        if (currentUser) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          await firebaseAuth.signOut();
          await currentUser.delete();
        }
        return {
          success: true,
          message: "User deleted successfully.",
        };
      } catch (error) {
        console.error("Error deleting user:", error);
        return {
          success: false,
          message: "An error occurred while deleting the user.",
        };
      }
    },

    createAchievementsSubcollection: async (_, { userId, taskPackId }) => {
      try {
        // Validate parameters
        if (!userId || typeof userId !== "string" || userId.trim() === "") {
          throw new Error("Invalid userId.");
        }
        if (
          !taskPackId ||
          typeof taskPackId !== "string" ||
          taskPackId.trim() === ""
        ) {
          throw new Error("Invalid taskPackId.");
        }

        // Check if the user exists
        const userRef = db.collection("USERS").doc(userId);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          throw new Error(`User with userId "${userId}" not found.`);
        }

        // Check if the taskPack exists
        const taskPackRef = db.collection("ACHIEVEMENTS").doc(taskPackId);
        const taskPackSnapshot = await taskPackRef.get();

        if (!taskPackSnapshot.exists) {
          throw new Error(
            `Task pack with taskPackId "${taskPackId}" not found.`
          );
        }

        // Create the achievements subcollection for the user
        await createAchievementsSubcollection(userId, taskPackId);

        return {
          message: "Achievements subcollection created successfully",
        };
      } catch (error) {
        console.error("Error creating achievements subcollection:", error);
        throw new Error(
          `An error occurred while creating the achievements subcollection: ${error.message}`
        );
      }
    },

    updateTopGame: async (_, { userID, topGame, topGameLength }, context) => {
      try {
        // Validate if the topGame exists in the GAMES collection
        const gameDoc = await db
          .collection("GAMES")
          .where("id", "==", topGame.toLowerCase())
          .get();

        if (gameDoc.empty) {
          throw new Error(
            "Provided topGame does not exist in the GAMES collection."
          );
        }

        // Your existing mutation logic here
        const userRef = db.collection("USERS").doc(userID);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error("User not found.");
        }

        // Update the topGames array at the specified position
        const updatedTopGames = [...userDoc.data().profile.topGames];
        updatedTopGames[topGameLength] = topGame;

        await userRef.update({
          "profile.topGames": updatedTopGames,
        });

        // Retrieve and return the updated user data
        const updatedUserDoc = await userRef.get();
        const updatedUserData = updatedUserDoc.data();

        return updatedUserData;
      } catch (error) {
        console.error("Error updating top game:", error);
        throw new Error("An error occurred while updating the top game");
      }
    },
    updateProgress: async (_, { userId, achievementsId, progressUpdate }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const achievementsRef = userRef
          .collection("ACHIEVEMENTS")
          .doc(achievementsId);

        const achievementsDoc = await achievementsRef.get();

        if (!achievementsDoc.exists) {
          throw new Error("Achievement not found");
        }

        const currentProgress = achievementsDoc.data().progress || [];

        // Add the new value to the progress array
        const updatedProgress = [...currentProgress, progressUpdate];

        await achievementsRef.update({
          progress: updatedProgress,
        });

        // Fetch and return the updated user data
        const updatedUserDoc = await userRef.get();
        const updatedUserData = updatedUserDoc.data();

        return {
          account: updatedUserData.account,
          profile: updatedUserData.profile,
        };
      } catch (error) {
        console.error("Error updating progress:", error);
        throw new Error("An error occurred while updating progress");
      }
    },
    deleteLastProgress: async (_, { userId, achievementsId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const achievementsRef = userRef
          .collection("ACHIEVEMENTS")
          .doc(achievementsId);
    
        const achievementsDoc = await achievementsRef.get();
    
        if (!achievementsDoc.exists) {
          throw new Error("Achievement not found");
        }
    
        const currentProgress = achievementsDoc.data().progress || [];
    
        // Check if the progress array is empty
        if (currentProgress.length === 0) {
          throw new Error("Progress array is empty");
        }
    
        // Remove the last element from the progress array
        const updatedProgress = currentProgress.slice(0, -1);
    
        await achievementsRef.update({
          progress: updatedProgress,
        });
    
        // Fetch and return the updated user data
        const updatedUserDoc = await userRef.get();
        const updatedUserData = updatedUserDoc.data();
    
        return {
          account: updatedUserData.account,
          profile: updatedUserData.profile,
        };
      } catch (error) {
        console.error("Error deleting last progress:", error);
        throw new Error("An error occurred while deleting last progress");
      }
    },    
    deleteUserTaskPack: async (_, { userId, taskPackId }) => {
      try {
        const userRef = db.collection("USERS").doc(userId);
        const userAchievementsRef = userRef.collection("ACHIEVEMENTS");

        // Get the specified task pack
        const taskPackRef = db.collection("ACHIEVEMENTS").doc(taskPackId);
        const taskPackDoc = await taskPackRef.get();

        if (!taskPackDoc.exists) {
          throw new Error("Task Pack not found");
        }

        // Delete tasks in the ACHIEVEMENTS subcollection of the user
        const querySnapshot = await userAchievementsRef
          .where("taskPackId", "==", taskPackId)
          .get();

        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await doc.ref.delete();
        });

        await Promise.all(deletePromises);

        // Fetch and return the updated user data
        const updatedUserDoc = await userRef.get();
        const updatedUserData = updatedUserDoc.data();

        return {
          success: true,
          message: "Tasks in task pack deleted successfully",
          account: updatedUserData.account,
          profile: updatedUserData.profile,
        };
      } catch (error) {
        console.error("Error deleting tasks in task pack:", error);
        throw new Error("An error occurred while deleting tasks in task pack");
      }
    },
  },
};

module.exports = UserMutation;
