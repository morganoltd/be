const { gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { GraphQLDateTime } = require('graphql-scalars');

const ACHIEVEMENTS = gql`
  scalar DateTime

  type Achievement {
    createdAt: DateTime!
    title: String!
    number: Int!
    accepted: [String!]!
    finished: [String!]!
    description: String!
    endsAt: DateTime!
    awards: [String!]!
  }

  type Query {
    all_achievements: [Achievement]
    current_achievements: [Achievement]
  }

  type Mutation {
    addNewAchievement(
      title: String!
      description: String!
      endsAt: DateTime!
    ): Achievement!

    acceptedUsers_achievements(
      achievement: String!
      username: String!
    ): String!

    finishedUsers_achievements(
      achievement: String!
      username: String!
    ): String!

    addAwards_achievements(
      achievement: String!
      premiumID: String!
    ): String!
  }
`;

module.exports = ACHIEVEMENTS;
