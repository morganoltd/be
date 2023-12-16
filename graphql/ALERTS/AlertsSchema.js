const { gql } = require("apollo-server-express");

const ALERTS = gql`

  type Mutation {
    addAlert(userId: ID!, text: String!, link: String!, createdAt: String, icon: String!, title: String!): AlertResponse!
    newAlertFalse(userId: ID!, alertId: ID!): SetNewAlertResponse!
    addAllUsersAlerts(text: String!, link: String!, createdAt: String, icon: String!, title: String!): AlertResponse!
  }
  
  type AlertResponse {
    message: String!
  }

  type SetNewAlertResponse {
    message: String!
  }

  type Query {
    userAlerts(userId: ID!): UserAlertsResponse!
  }
  
  type UserAlertsResponse {
    alerts: [Alert!]!
  }
  
  type Alert {
    alertId: ID!
    text: String!
    link: String!
    createdAt: String!
    newAlert: Boolean!
    icon: String!
    title: String!
  }

`;

module.exports = ALERTS;
