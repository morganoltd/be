const { gql } = require('apollo-server-express');

const ACHIEVEMENTS = gql`
  type TaskPack {
    id: String
    createdAt: String!
    title: String!
    description: String!
    color: String!
    endsAt: String!
    img: String!
  }

  type Task {
    id: String
    title: String!
    description: String!
    award: String!
    icon: String!
    maxProgress: Int!
  }

  type Mutation {
    addTaskPack(
      title: String!
      description: String!
      color: String!
      endsAt: String!
      img: String!
    ): TaskPack!

    updateTaskPack(
      id: String!
      description: String
      color: String
      endsAt: String
    ): TaskPack!

    deleteTaskPack(id: String!): TaskPack!

    addTask(
      idTask: String!
      taskPackId: String!
      title: String!
      description: String!
      award: String!
      icon: String!
      maxProgress: Int!
    ): Task!

    updateTask(
      taskId: String!
      description: String
      award: String
      icon: String
    ): Task!

    deleteTask(taskId: String!): Task!

    addAwardToPremium(
      userID: String!
      premiumArray: String!
      achievementID: String!
    ): MessageResponse!

    updateFinishedArray(
      taskId: String!
      userID: String!
    ): MessageResponse!

    progressQuery(userId: String!, achievementId: String!): ProgressDetails
  }

  type MessageResponse {
    message: String!
  }

  type TaskPackDetails {
    taskPack: TaskPack
    tasks: [Task]
  }

  type ProgressDetails {
    achievementId: String!
    progress: [String]!
  }

  type AchievementProgress {
    progress: [String]
    taskID: String
    taskPackID: String
  }

  type Query {
    taskPackDetails(taskPackId: String!): TaskPackDetails
    allTaskPacks: [TaskPackDetails]
    progressQuery(userId: String!, achievementId: String!): ProgressDetails
    AllProgressQuery(userId: String!): [AchievementProgress!]!
  }
`;

module.exports = ACHIEVEMENTS;
