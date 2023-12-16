const { db } = require('../../firebase/firebase');

const AchievementQuery = {
  Query: {
    taskPackDetails: async (_, { taskPackId }) => {
      try {
        const taskPackRef = db.collection('ACHIEVEMENTS').doc(taskPackId);
        const taskPackDoc = await taskPackRef.get();

        if (!taskPackDoc.exists) {
          throw new Error('Task pack not found.');
        }

        const taskPackData = taskPackDoc.data();

        const tasksRef = taskPackRef.collection('TASKS');
        const tasksSnapshot = await tasksRef.get();
        const tasks = tasksSnapshot.docs.map(doc => doc.data());

        const taskPackDetails = {
          taskPack: {
            id: taskPackId,
            createdAt: taskPackData.createdAt,
            title: taskPackData.title,
            accepted: taskPackData.accepted,
            description: taskPackData.description,
            color: taskPackData.color,
            endsAt: taskPackData.endsAt,
            img: taskPackData.img,
          },
          tasks: tasks,
        };

        return taskPackDetails;
      } catch (error) {
        console.error('Error fetching task pack details:', error);
        throw new Error('An error occurred while fetching task pack details');
      }
    },
    allTaskPacks: async () => {
      try {
        const taskPacksRef = db.collection('ACHIEVEMENTS');
        const taskPacksSnapshot = await taskPacksRef.get();
        const allTaskPacks = [];

        for (const doc of taskPacksSnapshot.docs) {
          const taskPackData = doc.data();

          const taskPackWithTasks = {
            taskPack: {
              id: doc.id,
              createdAt: taskPackData.createdAt || 'N/A',
              title: taskPackData.title || 'N/A',
              accepted: taskPackData.accepted || [],
              description: taskPackData.description || 'N/A',
              color: taskPackData.color || 'N/A',
              endsAt: taskPackData.endsAt || 'N/A',
              img: taskPackData.img || 'N/A',
            },
            tasks: [],
          };

          const tasksRef = doc.ref.collection('TASKS');
          const tasksSnapshot = await tasksRef.get();
          taskPackWithTasks.tasks = tasksSnapshot.docs.map(taskDoc => taskDoc.data());

          allTaskPacks.push(taskPackWithTasks);
        }

        return allTaskPacks;
      } catch (error) {
        console.error('Error fetching all task packs:', error);
        throw new Error('An error occurred while fetching all task packs');
      }
    },
      progressQuery: async (_, { userId, achievementId }) => {
      try {
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
          throw new Error('Invalid userId.');
        }
        if (!achievementId || typeof achievementId !== 'string' || achievementId.trim() === '') {
          throw new Error('Invalid achievementId.');
        }
    
        const userRef = db.collection('USERS').doc(userId);
        const userSnapshot = await userRef.get();
    
        if (!userSnapshot.exists) {
          throw new Error(`User with userId "${userId}" not found.`);
        }

        const progressRef = userRef.collection('ACHIEVEMENTS').doc(achievementId);
        const progressDoc = await progressRef.get();
    
        if (!progressDoc.exists) {
          throw new Error(`Achievement with achievementId "${achievementId}" not found.`);
        }
    
        const progressData = progressDoc.data();
    
        return {
          achievementId: achievementId,
          progress: progressData.progress || [],
        };
      } catch (error) {
        console.error('Error fetching progress:', error);
        throw new Error(`An error occurred while fetching progress: ${error.message}`);
      }
    },
    AllProgressQuery: async (_, { userId }) => {
      try {
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
          throw new Error('Invalid userId.');
        }
    
        const userRef = db.collection('USERS').doc(userId);
        const userSnapshot = await userRef.get();
    
        if (!userSnapshot.exists) {
          throw new Error(`User with userId "${userId}" not found.`);
        }
    
        const progressCollectionRef = userRef.collection('ACHIEVEMENTS');
        const progressQuerySnapshot = await progressCollectionRef.get();
    
        const allProgress = [];
    
        progressQuerySnapshot.forEach((progressDoc) => {
          const progressData = progressDoc.data();
          allProgress.push({
            taskID: progressDoc.id, 
            taskPackID: progressData.taskPackID, 
            progress: progressData.progress || [],
            achievementName: progressData.achievementName || null,
          });
        });
    
        return allProgress;
      } catch (error) {
        console.error('Error fetching all progress:', error);
        throw new Error(`An error occurred while fetching all progress: ${error.message}`);
      }
    },
        
  },
};

module.exports = AchievementQuery;