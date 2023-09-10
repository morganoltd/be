const { gql } = require('apollo-server-express');

const AVATARS = gql`
  type Avatar {
    name: String!
    url: String!
    tags: [String!]
  }

  type Query {
    All_Avatars: [Avatar]
  }

  type Mutation {
    addAvatar(name: String!, url: String!, tags: [String!]): Avatar
  }
`;

module.exports = AVATARS;