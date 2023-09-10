const { gql } = require('apollo-server-express');

const AUTH = gql`
  type AuthPayload {
    email: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload
  }
`;

module.exports = AUTH;
