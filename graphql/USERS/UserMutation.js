// muszę poprawić dodawanie gier - jak ktoś wpisze 2 razy tą samą to wywala zły erorr

const { db, firebaseAuth } = require('../../firebase/firebase');
const validCountries = require('./validCountries');

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

const UserMutation = {
  Mutation: {
    addUser: async (_, { username, password, games, email, country }) => {
      try {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          throw new Error('Invalid email format.');
        }

        // Check if the provided country is valid
        if (!validCountries.includes(country)) {
          throw new Error('Invalid country.');
        }

        if (games.length < 5) {
          throw new Error('At least 5 games are required.');
        }

        const createdAt = formatCreatedAt(new Date()); // Format createdAt using the custom function

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

        // Create a new user account using Firebase Authentication
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid; // Get the user's Firebase Authentication UID

        const newUser = {
          account: {
            uid: uid,
            username: username,
            createdAt: createdAt,
            email: email,
            country: country,
            role: "user", // Default role
          },
          profile: {
            avatar: "",
            billboard: "",
            games: validGames, // Only add the valid games to the user's profile
            social: {
              facebook: "",
              twitter: "",
              youtube: "",
            },
          },
          subscriptions: {
            subbedBy: [], // Who is subscribed to this user
            subbedTo: [], // Who is this user subscribed to
          },
        };

        // Use the user's email as the document name in the USERS collection
        await db.collection('USERS').doc(email).set(newUser);

        return newUser;

      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('An error occurred while adding the user');
      }
    },
  },
};

module.exports = UserMutation;
