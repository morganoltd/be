const { db } = require("../../firebase/firebase");

const AlertsMutation = {
    Mutation: {
        addAlert: async (_, { userId, text, link, createdAt, icon, title }) => {
            try {
              const userSnapshot = await db.collection('USERS').doc(userId).get();
              if (!userSnapshot.exists) {
                return {
                  message: 'User does not exist.',
                };
              }
        
              const alertId = db.collection('ALERTS').doc().id;
        
              const newAlertData = {
                title: title || '',
                text: text || '',
                link: link || '',
                createdAt: createdAt || new Date().toISOString(),
                newAlert: true,
                icon: icon || '',
              };
        
              const userRef = db.collection('USERS').doc(userId);
              await userRef.collection('ALERTS').doc(alertId).set(newAlertData);
        
              return {
                message: 'Alert added successfully.',
              };
            } catch (error) {
              console.error('Error adding alert:', error);
              return {
                message: 'An error occurred while adding the alert.',
              };
            }
          },
          addAllUsersAlerts: async (_, { text, link, createdAt, icon, title }) => {
            try {
              const usersSnapshot = await db.collection('USERS').get();
          
              const alertsBatch = db.batch();
          
              usersSnapshot.forEach((userDoc) => {
                const userId = userDoc.id;
                const alertId = db.collection('ALERTS').doc().id;
          
                const newAlertData = {
                  title: title || '',
                  text: text || '',
                  link: link || '',
                  createdAt: createdAt || new Date().toISOString(),
                  newAlert: true,
                  icon: icon || '',
                };
          
                const userRef = db.collection('USERS').doc(userId);
                const alertRef = userRef.collection('ALERTS').doc(alertId);
          
                alertsBatch.set(alertRef, newAlertData);
              });
          
              await alertsBatch.commit();
          
              return {
                message: 'Alerts added successfully to all users.',
              };
            } catch (error) {
              console.error('Error adding alerts to all users:', error);
              return {
                message: 'An error occurred while adding alerts to all users.',
              };
            }
          },          
          newAlertFalse: async (_, { userId, alertId }) => {
            try {
              const userRef = db.collection('USERS').doc(userId);
              const alertRef = userRef.collection('ALERTS').doc(alertId);
        
              await alertRef.update({
                newAlert: false,
              });
        
              return {
                message: 'newAlert set to false successfully.',
              };
            } catch (error) {
              console.error('Error setting newAlert to false:', error);
              return {
                message: 'An error occurred while setting newAlert to false.',
              };
            }
          },
        },
};

module.exports = AlertsMutation;