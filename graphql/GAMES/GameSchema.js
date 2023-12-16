const { gql } = require('apollo-server-express');

const GAMES = gql`
  type Game {
    id: ID!
    title: String!
    developer: String!
    publisher: String!
    store: Store!
    platforms: [String!]!
    release: Release!
    description: String!
    likes: Int!
  }

  input NewGameInput {
    title: String!
    developer: String!
    publisher: String!
    store: StoreInput!
    platforms: [String!]!
    release: ReleaseInput!
    description: String!
    likes: Int!
  }

  type Store {
    billboard: String!
    card: Card!
    block: String!
    gameplay: String!
    stickers: [String!]!
    avatars: [String!]!
    backgrounds: [String!]!
  }

  input StoreInput {
    billboard: String
    card: CardInput
    block: String
    gameplay: String
    stickers: [String]
    avatars: [String]
    backgrounds: [String]
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

  input UpdateGameInput {
  title: String
  developer: String
  publisher: String
  store: StoreInput
  platforms: [String!]
  release: ReleaseInput
  description: String
  likes: Int
}

  type Query {
    single_game(id: ID!): Game
    all_games: [Game]
  }

  type Mutation {
    addGame(input: NewGameInput!): Game
    deleteGame(id: ID!): Game
    likeGame(id: ID!): Game
    unlikeGame(id: ID!): Game
    updateGame(id: ID!, input: UpdateGameInput!): Game
  }
`;

module.exports = GAMES;

