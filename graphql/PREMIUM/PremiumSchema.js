const { gql } = require('apollo-server-express');

const PREMIUM = gql`
  type Premium {
    name: String!
    url: String!
    format: String!
    used: Int!
    tags: [String!]
  }

  type Query {
    all_Premium: [Premium]
  }

  type Mutation {
    add_Premium(name: String!, url: String!, format: String!, tags: [String!]): Premium
    counter_used(id: String!): Int
  }
`;

module.exports = PREMIUM;