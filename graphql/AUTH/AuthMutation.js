const { firebaseAuth } = require('../../firebase/firebase');

const AuthMutation = {
  Mutation: {
    login: async (_, { input }) => {
      try {
        const { email, password } = input;
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
        const userEmail = userCredential.user.email;
        return { email: userEmail };
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Unable to log in");
      }
    },
  },
};

module.exports = AuthMutation;
