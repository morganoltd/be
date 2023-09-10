const { gql } = require('apollo-server-express');

const GAMES = gql`
  type Game {
    id: ID!
    title: String!
    developer: String!
    publisher: String!
    genre: [String!]!
    mode: [String!]!
    store: Store!
    platforms: [String!]!
    release: Release!
    description: String!
    tags: [String!]!
  }

  input NewGameInput {
    title: String!
    developer: String!
    publisher: String!
    genre: [String!]!
    mode: [String!]!
    store: StoreInput!
    platforms: [String!]!
    release: ReleaseInput!
    description: String!
    tags: [String!]!
  }

  type Store {
    billboard: String!
    card: Card!
    block: String!
    gameplay: String!
  }

  input StoreInput {
    billboard: String
    card: CardInput
    footer: String
    block: String
    gameplay: String
  }

  type Card {
    url: String!
    position: Int!
  }

  input CardInput {
    url: String!
    position: Int!
  }

  type Release {
    day: Int!
    month: String!
    year: Int!
  }

  input ReleaseInput {
    day: Int!
    month: String!
    year: Int!
  }

  type Query {
    single_game(id: ID!): Game
    all_games: [Game]
  }

  type Mutation {
    addGame(input: NewGameInput!): Game
    updateGameStore(id: ID!, storeInput: StoreInput!): Game
    deleteGame(id: ID!): Game
  }
`;

module.exports = GAMES;
