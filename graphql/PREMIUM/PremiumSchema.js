const { gql } = require('apollo-server-express');

const PREMIUM = gql`
  type PremiumItem {
    id: String!
    name: String!
    url: String!
    unit: String!
  }

  type Query {
    allPremiumItems: [PremiumItem]
  }

  type Mutation {
    addPremiumItem(name: String!, url: String!, unit: String!): PremiumItem
  }
`;

module.exports = PREMIUM;
