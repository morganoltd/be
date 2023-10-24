const { gql } = require('apollo-server-express');

const IMG = gql`
  type Img {
    name: String!
    url: String!
    format: String!
    used: Int!
    tags: [String]
  }

  type Query {
    all_Img: [Img]
  }

  type Mutation {
    add_Img(name: String!, url: String!, format: String!, tags: [String]): Img
    counter_used(id: String!): Int
  }
`;

module.exports = IMG;