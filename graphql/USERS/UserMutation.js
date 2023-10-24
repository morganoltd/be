const { db, firebaseAuth } = require('../../firebase/firebase');
const validCountries = require('./validCountries');

function formatCreatedAt(date) {
  return date.toISOString();
}

const UserMutation = {
  Mutation: {
    addUser: async (_, { username, password, games, email, country }) => {
      try {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          throw new Error('Invalid email format.');
        }
        if (!validCountries.includes(country)) {
          throw new Error('Invalid country.');
        }
        if (games.length < 5) {
          throw new Error('At least 5 games are required.');
        }

        const createdAt = formatCreatedAt(new Date()); 
        const lowercaseGames = games.map(game => game.toLowerCase());
        const validGamesSnapshot = await db.collection('GAMES')
          .where('id', 'in', lowercaseGames)
          .get();
        const validGames = validGamesSnapshot.docs.map(doc => doc.data().id);

        if (validGames.length !== games.length) {
          throw new Error('Some provided games do not exist in the GAMES collection.');
        }

        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        await db.collection('USERS').doc(username).set({
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
            views: [],
            subbedBy: [], 
            subbedTo: [], 
            liked: [],
            social: {
              facebook: "",
              x: "",
              youtube: "",
              twitch: "",
            },
            achievements: {
              accepted: [],
              finished: [],
            }
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
            views: [],
            liked: [],
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
          }
          },
        };

      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('An error occurred while adding the user');
      }
    },
    addUserGame: async (_, { userId, gameId }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();
        const updatedGames = [...userData.profile.games, gameId];

        await userRef.update({
          'profile.games': updatedGames,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            games: updatedGames,
          },
        };
      } catch (error) {
        console.error('Error adding user game:', error);
        throw new Error('An error occurred while adding the game');
      }
    },
    deleteUserGame: async (_, { userId, gameId }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();
        const updatedGames = userData.profile.games.filter(game => game !== gameId);

        await userRef.update({
          'profile.games': updatedGames,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            games: updatedGames,
          },
        };
      } catch (error) {
        console.error('Error deleting user game:', error);
        throw new Error('An error occurred while deleting the game');
      }
    },
    addLikedPost: async (_, { userId, postId }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          throw new Error('User not found');
        }
    
        const userData = userDoc.data();
        const updatedLikedPosts = [...userData.profile.likedPosts, postId];
    
        await userRef.update({
          'profile.likedPosts': updatedLikedPosts, 
        });
    
        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedPosts: updatedLikedPosts, 
          },
        };
      } catch (error) {
        console.error('Error adding liked post:', error);
        throw new Error('An error occurred while adding the liked post');
      }
    },
    deleteLikedPost: async (_, { userId, postId }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          throw new Error('User not found');
        }
    
        const userData = userDoc.data();
        const updatedLikedPosts = userData.profile.likedPosts.filter(likedPostId => likedPostId !== postId);
    
        await userRef.update({
          'profile.likedPosts': updatedLikedPosts,
        });
    
        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedPosts: updatedLikedPosts, 
          },
        };
      } catch (error) {
        console.error('Error deleting liked post:', error);
        throw new Error('An error occurred while deleting the liked post');
      }
    },    
    addViewedPost: async (_, { userId, postId }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          throw new Error('User not found');
        }
    
        const userData = userDoc.data();
        const updatedViewedPosts = [...userData.profile.views, postId]; 
    
        await userRef.update({
          'profile.views': updatedViewedPosts,
        });
    
        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            views: updatedViewedPosts,
          },
        };
      } catch (error) {
        console.error('Error adding viewed post:', error);
        throw new Error('An error occurred while adding the viewed post');
      }
    },    
    addLikedComment: async (_, { userId, commentID }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();
        const updatedLikedComments = [...userData.profile.likedComments, commentID];

        await userRef.update({
          'profile.likedComments': updatedLikedComments,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedComments: updatedLikedComments,
          },
        };
      } catch (error) {
        console.error('Error adding liked comment:', error);
        throw new Error('An error occurred while adding the liked comment');
      }
    },

    deleteLikedComment: async (_, { userId, commentID }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();
        const updatedLikedComments = userData.profile.likedComments.filter(
          likedCommentId => likedCommentId !== commentID
        );

        await userRef.update({
          'profile.likedComments': updatedLikedComments,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            likedComments: updatedLikedComments,
          },
        };
      } catch (error) {
        console.error('Error deleting liked comment:', error);
        throw new Error('An error occurred while deleting the liked comment');
      }
    },
    updateUserData: async (_, { userId, input }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          throw new Error('User not found');
        }
    
        const userData = userDoc.data();
    
        if (input.username) {
          const newUsername = input.username;
          userData.account.username = newUsername;
    
          const newUserRef = db.collection('USERS').doc(newUsername);
          await newUserRef.set(userData);
          await userRef.delete();
    
          userId = newUsername;
        }
        if (input.country && validCountries.includes(input.country)) {
          userData.account.country = input.country;
        }
    
        const profileFields = ['avatar', 'billboard', 'social'];
        profileFields.forEach(field => {
          if (input[field] !== undefined) {
            if (field === 'social') {
              userData.profile[field] = { ...userData.profile[field], ...input[field] };
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
        console.error('Error updating user data:', error);
        throw new Error('An error occurred while updating user data');
      }
    },    
    updateUserEmail: async (_, { userId, newEmail }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();

        const currentUser = firebaseAuth.currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated');
        }

        await currentUser.updateEmail(newEmail);

        await userRef.update({
          'account.email': newEmail,
        });

        return {
          account: {
            ...userData.account,
            email: newEmail,
          },
          profile: userData.profile,
        };
      } catch (error) {
        console.error('Error updating user email:', error);
        throw new Error('An error occurred while updating user email');
      }
    },
    updateUserPassword: async (_, { userId, newPassword }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();


        const currentUser = firebaseAuth.currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated');
        }

        await currentUser.updatePassword(newPassword);

        return {
          account: userData.account,
          profile: userData.profile,
        };
      } catch (error) {
        console.error('Error updating user password:', error);
        throw new Error('An error occurred while updating user password');
      }
    },
    acceptAchievements: async (_, { userId, achievementId }) => {
      try {
        const userRef = db.collection('USERS').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found');
        }

        const userData = userDoc.data();
        const updatedAchievements = [...userData.profile.achievements.accepted, achievementId];

        await userRef.update({
          'profile.achievements.accepted': updatedAchievements,
        });

        return {
          account: userData.account,
          profile: {
            ...userData.profile,
            achievements: {
              ...userData.profile.achievements,
              accepted: updatedAchievements,
            },
          },
        };
      } catch (error) {
        console.error('Error accepting achievement:', error);
        throw new Error('An error occurred while accepting the achievement');
      }
    },
      finishAchievements: async (_, { userId, achievementId }) => {
        try {
          const userRef = db.collection('USERS').doc(userId);
          const userDoc = await userRef.get();
  
          if (!userDoc.exists) {
            throw new Error('User not found');
          }
  
          const userData = userDoc.data();
          const { accepted, finished } = userData.profile.achievements;
  
          if (!accepted.includes(achievementId)) {
            throw new Error('Achievement not found in accepted list');
          }
  
          const updatedAccepted = accepted.filter(id => id !== achievementId);
          const updatedFinished = [...finished, achievementId];
  
          await userRef.update({
            'profile.achievements.accepted': updatedAccepted,
            'profile.achievements.finished': updatedFinished,
          });
  
          return {
            account: userData.account,
            profile: {
              ...userData.profile,
              achievements: {
                accepted: updatedAccepted,
                finished: updatedFinished,
              },
            },
          };
        } catch (error) {
          console.error('Error finishing achievement:', error);
          throw new Error('An error occurred while finishing the achievement');
        }
      },
      subscribeUser: async (_, { userId, targetUserId }) => {
        try {
          const userRef = db.collection('USERS').doc(userId);
          const targetUserRef = db.collection('USERS').doc(targetUserId);
      
          const [userDoc, targetUserDoc] = await Promise.all([userRef.get(), targetUserRef.get()]);
      
          if (!userDoc.exists || !targetUserDoc.exists) {
            throw new Error('User or target user not found');
          }
      
          const userData = userDoc.data();
          const targetUserData = targetUserDoc.data();
      
          const updatedSubbedTo = [...userData.profile.subbedTo, targetUserId];
      
          await userRef.update({
            'profile.subbedTo': updatedSubbedTo,
          });
      
          const updatedSubbedBy = [...targetUserData.profile.subbedBy, userId];
          await targetUserRef.update({
            'profile.subbedBy': updatedSubbedBy,
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
          console.error('Error subscribing to the user:', error);
          throw new Error('An error occurred while subscribing to the user');
        }
      },
      unsubscribeUser: async (_, { userId, targetUserId }) => {
        try {
          const userRef = db.collection('USERS').doc(userId);
          const targetUserRef = db.collection('USERS').doc(targetUserId);
      
          const [userDoc, targetUserDoc] = await Promise.all([userRef.get(), targetUserRef.get()]);
      
          if (!userDoc.exists || !targetUserDoc.exists) {
            throw new Error('User or target user not found');
          }
      
          const userData = userDoc.data();
          const targetUserData = targetUserDoc.data();
      
          const updatedSubbedTo = userData.profile.subbedTo.filter(id => id !== targetUserId);
      
          await userRef.update({
            'profile.subbedTo': updatedSubbedTo,
          });
      
          const updatedSubbedBy = targetUserData.profile.subbedBy.filter(id => id !== userId);
          await targetUserRef.update({
            'profile.subbedBy': updatedSubbedBy,
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
          console.error('Error unsubscribing user:', error);
          throw new Error('An error occurred while unsubscribing the user');
        }
      },
      deleteUser: async (_, { userId }) => {
        try {
          const userRef = db.collection('USERS').doc(userId);
          const userDoc = await userRef.get();
  
          if (!userDoc.exists) {
            throw new Error('User not found');
          }
  
          const userData = userDoc.data();
  
          await userRef.delete();
  
          const currentUser = firebaseAuth.currentUser;
  
          if (currentUser) {
            await firebaseAuth.signOut();
  
            await currentUser.updateEmail("deleted_user@example.com");
  
            await currentUser.delete();
          } else {
            throw new Error('User not authenticated');
          }
  
          const subbedByArray = userData.profile.subscriptions.subbedBy;
          const subbedToArray = userData.profile.subscriptions.subbedTo;
  
          await Promise.all(subbedByArray.map(async (subscriberId) => {
            try {
              const subscriberRef = db.collection('USERS').doc(subscriberId);
              const subscriberDoc = await subscriberRef.get();
  
              if (subscriberDoc.exists) {
                const updatedSubbedToArray = subscriberDoc.data().profile.subscriptions.subbedTo
                  .filter(id => id !== userId);
  
                await subscriberRef.update({
                  'profile.subscriptions.subbedTo': updatedSubbedToArray,
                });
              }
            } catch (error) {
              console.error('Error updating subbedTo array for subscriber:', error);
            }
          }));
  
          await Promise.all(subbedToArray.map(async (targetUserId) => {
            try {
              const targetUserRef = db.collection('USERS').doc(targetUserId);
              const targetUserDoc = await targetUserRef.get();
  
              if (targetUserDoc.exists) {
                const updatedSubbedByArray = targetUserDoc.data().profile.subscriptions.subbedBy
                  .filter(id => id !== userId);
  
                await targetUserRef.update({
                  'profile.subscriptions.subbedBy': updatedSubbedByArray,
                });
              }
            } catch (error) {
              console.error('Error updating subbedBy array for target user:', error);
            }
          }));
  
          return {
            success: true,
            message: 'User deleted successfully.',
          };
        } catch (error) {
          console.error('Error deleting user:', error);
          return {
            success: false,
            message: 'An error occurred while deleting the user.',
          };
        }
      },
    },
};

module.exports = UserMutation;
