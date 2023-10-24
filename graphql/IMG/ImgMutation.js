const { db } = require('../../firebase/firebase');

const ImgMutation = {
  Mutation: {
    add_Img: async (_, { name, url, format }) => {
      try {
        const imgRef = db.collection('IMG').doc(name);

        const imgData = {
          name,
          url,
          format,
          tags: [],
          used: 0,
        };

        await imgRef.set(imgData);

        return imgData; 
      } catch (error) {
        throw new Error('Nie udało się dodać obrazka.');
      }
    },
    counter_used: async (_, { id }) => {
      try {
        const imgRef = db.collection('IMG').doc(id);

        const imgSnapshot = await imgRef.get();

        if (!imgSnapshot.exists) {
          throw new Error('Nie znaleziono obrazka o podanym id.');
        }

        const imgData = imgSnapshot.data();
        const updatedUsed = imgData.used + 1;

        await imgRef.update({ used: updatedUsed });

        return updatedUsed; 
      } catch (error) {
        throw new Error('Nie udało się zaktualizować licznika użycia.');
      }
    },
  },
};

module.exports = ImgMutation;
