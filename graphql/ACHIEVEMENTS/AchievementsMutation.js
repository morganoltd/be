const { db } = require('../../firebase/firebase');

const AchievementMutation = {
  Mutation: {
    addTaskPack: async (_, { title, description, color, endsAt, img }) => {
      try {
        // Validate that title is a non-empty string
        if (!title || typeof title !== 'string' || title.trim() === '') {
          throw new Error('Invalid title.');
        }
    
        const existingTaskPack = await db.collection('ACHIEVEMENTS').where('title', '==', title).get();
    
        if (!existingTaskPack.empty) {
          throw new Error('A task pack with the same title already exists.');
        }
    
        const createdAt = new Date().toISOString();
        const endsAtISO = new Date(endsAt).toISOString(); // Convert endsAt to ISO format
    
        const sanitizedTitle = title.toLowerCase().replace(/[\s-]+/g, '_');
        const TaskPackId = `${sanitizedTitle}`;
        const TaskPackRef = db.collection('ACHIEVEMENTS').doc(TaskPackId);
    
        const TaskPack = {
          id: TaskPackId, // Include 'id' in the returned object
          createdAt,
          title,
          accepted: [],
          description,
          color,
          img,
          endsAt: endsAtISO,
        };
    
        await TaskPackRef.set(TaskPack); // Use TaskPack instead of newTaskPack
    
        return TaskPack;
      } catch (error) {
        console.error('Error adding task pack:', error);
        throw new Error('An error occurred while adding the task pack');
      }
    },

    updateTaskPack: async (_, { id, description, color, endsAt }) => {
      try {
        const TaskPackRef = db.collection('ACHIEVEMENTS').doc(id);
    
        const existingTaskPack = await TaskPackRef.get();
    
        if (!existingTaskPack.exists) {
          throw new Error('Task pack not found.');
        }
    
        const existingData = existingTaskPack.data();
    
        if (!existingData || typeof existingData !== 'object' || !existingData.hasOwnProperty('description')) {
          throw new Error('Invalid existing data for the Task pack.');
        }
    
        const updatedTaskPack = {
          description: description || existingData.description,
          color: color || existingData.color,
          endsAt: endsAt ? new Date(endsAt).toISOString() : existingData.endsAt,
        };
    
        await TaskPackRef.update(updatedTaskPack);
    
        return { id, ...existingData, ...updatedTaskPack };
      } catch (error) {
        console.error('Error updating Task pack:', error);
        throw new Error('An error occurred while updating the Task pack');
      }
    },    

    deleteTaskPack: async (_, { id }) => {
      try {
        const TaskPackRef = db.collection('ACHIEVEMENTS').doc(id);
    
        const existingTaskPack = await TaskPackRef.get();
    
        if (!existingTaskPack.exists) {
          throw new Error('Task Pack not found.');
        }
    
        const deletedData = existingTaskPack.data();
    
        // Delete the main task pack document
        await TaskPackRef.delete();
    
        // Handle deletion of nested data, if applicable
        // Example: Assuming there is a nested collection called 'tasks'
        const nestedTasksRef = db.collection('ACHIEVEMENTS').doc(id).collection('TASKS');
        const nestedTasksSnapshot = await nestedTasksRef.get();
    
        nestedTasksSnapshot.forEach(async (doc) => {
          await doc.ref.delete();
        });
    
        // Include 'id' explicitly in the returned object
        return { id, ...deletedData };
      } catch (error) {
        console.error('Error deleting Task Pack:', error);
        throw new Error('An error occurred while deleting the Task Pack');
      }
    },

    addTask: async (_, { taskPackId, idTask, maxProgress, title, description, award, icon }) => {
      try {
        // Validate that taskPackId is provided and is a non-empty string
        if (!taskPackId || typeof taskPackId !== 'string' || taskPackId.trim() === '') {
          throw new Error('Invalid taskPackId.');
        }
    
        // Check if the task pack exists
        const taskPackRef = db.collection('ACHIEVEMENTS').doc(taskPackId);
        const taskPackDoc = await taskPackRef.get();
    
        if (!taskPackDoc.exists) {
          throw new Error('Task pack does not exist.');
        }
    
        // Generate a unique ID for the task using the title with underscores
        const taskId = idTask.toLowerCase().replace(/[\s]+/g, '_');
        const taskRef = taskPackRef.collection('TASKS').doc(taskId); // Use 'TASKS' in all caps for the subcollection
    
        const task = {
          idTask,
          id: taskId,
          title,
          description,
          award,
          icon,
          maxProgress,
        };
    
        await taskRef.set(task);
    
        return task;
      } catch (error) {
        console.error('Error adding task:', error);
        throw new Error('An error occurred while adding the task');
      }
    },  

    updateTask: async (_, { taskId, description, award }) => {
      try {
        // Validate that taskId is provided and is a non-empty string
        if (!taskId || typeof taskId !== 'string' || taskId.trim() === '') {
          throw new Error('Invalid taskId.');
        }
    
        // Check if the task exists
        const taskRef = db.collectionGroup('TASKS').where('id', '==', taskId);
        const snapshot = await taskRef.get();
    
        if (snapshot.empty) {
          throw new Error('Task does not exist.');
        }
    
        // Update the task fields if provided
        const updatedFields = {};
        if (description) updatedFields.description = description;
        if (award) updatedFields.award = award;
    
        // Update each matching document in the collection group
        snapshot.forEach(doc => {
          doc.ref.update(updatedFields);
        });
    
        // Retrieve the title from the first document in the snapshot
        const firstDoc = snapshot.docs[0];
        const task = {
          id: taskId,
          title: firstDoc.get('title'),
          description,
          award,
          finished: [],
        };
    
        return task;
      } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('An error occurred while updating the task');
      }
    },
    
    deleteTask: async (_, { taskId }) => {
      try {
        // Validate that taskId is provided and is a non-empty string
        if (!taskId || typeof taskId !== 'string' || taskId.trim() === '') {
          throw new Error('Invalid taskId.');
        }
    
        const taskRef = db.collectionGroup('TASKS').where('id', '==', taskId);
        const snapshot = await taskRef.get();
    
        if (snapshot.empty) {
          throw new Error('Task does not exist.');
        }
    
        // Delete each matching document in the collection group
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
    
        return {
          message: 'Task deleted successfully',
        };
      } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('An error occurred while deleting the task');
      }
    },

    updateFinishedArray: async (_, { taskId, userID }) => {
      try {
    
        const userRef = db.collection('USERS').doc(userID);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found.');
        }
    
        // Fetch the task document based on taskId
        const taskRef = db.collectionGroup('TASKS').where('id', '==', taskId);
        const taskSnapshot = await taskRef.get();
    
        if (taskSnapshot.empty) {
          throw new Error(`No task found with taskId "${taskId}".`);
        }
    
        // Update the "finished" array with the provided username
        const taskPackId = taskSnapshot.docs[0].ref.parent.parent.id;
        const taskRefInTaskPack = db.collection('ACHIEVEMENTS').doc(taskPackId).collection('TASKS').doc(taskId);
    
        await taskRefInTaskPack.update({
          finished: [...taskSnapshot.docs[0].data().finished, userID],
        });
    
        return {
          message: 'Finished array updated successfully',
        };
      } catch (error) {
        console.error('Error updating finished array:', error);
        throw new Error(`An error occurred while updating the finished array: ${error.message}`);
      }
    },

    addAwardToPremium: async (_, { userID, premiumArray, achievementID }) => {
      try {
        // Validate parameters
        if (!userID || typeof userID !== 'string' || userID.trim() === '') {
          throw new Error('Invalid userID.');
        }
        if (!premiumArray || typeof premiumArray !== 'string' || premiumArray.trim() === '') {
          throw new Error('Invalid premiumArray.');
        }
        if (!achievementID || typeof achievementID !== 'string' || achievementID.trim() === '') {
          throw new Error('Invalid achievementID.');
        }

        // Check if the user exists
        const userRef = db.collection('USERS').doc(userID);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          throw new Error('User not found.');
        }

        // Check if the premiumArray is valid
        const validPremiumArrays = ['backgrounds', 'fonts', 'sliders', 'players', 'avatars', 'stickers', 'billboards', 'colors'];
        if (!validPremiumArrays.includes(premiumArray)) {
          throw new Error('Invalid premiumArray. Must be one of: backgrounds, fonts, sliders, players, avatars, stickers, billboards, colors.');
        }

        // Fetch the document in the TASKS subcollection to get the "award" value
        const taskRef = db.collectionGroup('TASKS').where('id', '==', achievementID);
        const taskSnapshot = await taskRef.get();

        if (taskSnapshot.empty) {
          throw new Error(`No task found in the nested TASKS subcollection for achievement "${achievementID}".`);
        }

        const award = taskSnapshot.docs[0].data().award;

        // Check if the award exists
        if (!award) {
          throw new Error(`No award found in the task for achievement "${achievementID}".`);
        }

        // Add the award to the premiumArray
        const currentPremiumArray = userDoc.data().profile.premium[premiumArray] || [];
        const updatedPremiumArray = [...currentPremiumArray, award];

        // Update the user's document
        await userRef.update({
          [`profile.premium.${premiumArray}`]: updatedPremiumArray,
        });

        return {
          message: 'Award added to premium array successfully',
        };
      } catch (error) {
        console.error('Error adding award to premium array:', error);
        throw new Error(`An error occurred while adding the award to the premium array: ${error.message}`);
      }
    },
  },
};

module.exports = AchievementMutation;