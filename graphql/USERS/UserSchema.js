const { gql } = require("apollo-server-express");

const USERS = gql`
  type User {
    account: Account!
    profile: Profile!
  }

  type Account {
    uid: String!
    username: String!
    createdAt: String!
    email: String!
    country: String!
    role: String!
    accepted: [String]
    finished: [String]
  }

  type Profile {
    avatar: String
    billboard: String
    games: [String]
    topGames: [String]
    social: Social
    liked: [String]
    likedPosts: [String]
    likedComments: [String]
    views: [String]
    subbedBy: [String]
    subbedTo: [String]
    premium: Premium
    progress: [String] # Added progress field
  }

  type Social {
    facebook: String
    x: String
    youtube: String
    twitch: String
  }

  type Premium {
    backgrounds: [String]
    fonts: [String]
    sliders: [String]
    players: [String]
    avatars: [String]
    stickers: [String]
    billboards: [String]
    colors: [String]
  }

  input UpdateUserDataInput {
    username: String
    country: String
    avatar: String
    billboard: String
    social: SocialInput
  }

  input SocialInput {
    facebook: String
    x: String
    youtube: String
    twitch: String
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String
  }

  type Query {
    All_Users: [User]
    get_user(id: ID!): User
    getTopGames(id: ID!): [String]
  }

  type Mutation {
    addUser(
      username: String!
      password: String!
      games: [String]!
      email: String!
      country: String!
    ): User
    addUserGame(userId: String!, gameId: String!): User
    deleteUserGame(userId: String!, gameId: String!): User
    addLikedPost(userId: String!, postId: String!): User
    addViewedPost(userId: String!, postId: String!): User
    deleteLikedPost(userId: String!, postId: String!): User

    addLikedComment(userId: String!, commentID: String!): User
    deleteLikedComment(userId: String!, commentID: String!): User

    updateUserData(userId: String!, input: UpdateUserDataInput!): User
    updateUserEmail(userId: String!, newEmail: String!): User
    updateUserPassword(userId: String!, newPassword: String!): User
    acceptAchievements(userId: String!, achievementId: String!): User
    finishAchievements(userId: String!, achievementId: String!): User
    subscribeUser(userId: String!, targetUserId: String!): User
    unsubscribeUser(userId: String!, targetUserId: String!): User
    deleteUser(userId: String!): DeleteUserResponse

    createAchievementsSubcollection(userId: String!, taskPackId: String!): MessageResponse

    updateTopGame(
      userID: String!
      topGame: String!
      topGameLength: Int!
    ): User

    updateProgress(
      userId: String!
      achievementsId: String!
      progressUpdate: String!
    ): User

    deleteLastProgress(
      userId: String!
      achievementsId: String!
    ): User

    deleteUserTaskPack(
      userId: String!
      taskPackId: String!
    ): DeleteUserResponse

  }

  type MessageResponse {
    message: String!
  }
`;

module.exports = USERS;