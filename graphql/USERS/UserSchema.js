const { gql } = require('apollo-server-express');

const USERS = gql`
type User {
  account: Account!
  profile: Profile!  # Dodaj pole "profile" do typu "User"
}

  type Account {
    uid: String!
    username: String!
    createdAt: String!
    email: String!
    country: String!
    role: String!
  }

type Profile {
  avatar: String!
  billboard: String!
  games: [String]!
  social: Social!
}

type Social {
  facebook: String!
  twitter: String!
  youtube: String!
}

type Query {
  All_Users: [User]
  get_user(id: ID!): User
}

  type Mutation {
    addUser(username: String!, password: String!, games: [String]!, email: String!, country: String!): User
  }
`;

module.exports = USERS;
