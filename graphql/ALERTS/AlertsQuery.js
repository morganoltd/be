const { db } = require('../../firebase/firebase');

const AlertsQuery = {
    Query: {
        userAlerts: async (_, { userId }) => {
            try {
              // Retrieve all alerts for the specified user
              const userRef = db.collection('USERS').doc(userId);
              const alertsSnapshot = await userRef.collection('ALERTS').get();
        
              // Map the alerts data
              const alerts = [];
              alertsSnapshot.forEach(doc => {
                const alertData = doc.data();
                alerts.push({
                  alertId: doc.id,
                  ...alertData,
                });
              });
        
              return {
                success: true,
                alerts,
              };
            } catch (error) {
              console.error('Error retrieving user alerts:', error);
              return {
                success: false,
                message: 'An error occurred while retrieving user alerts.',
              };
            }
        },
    },
};

module.exports = AlertsQuery;
