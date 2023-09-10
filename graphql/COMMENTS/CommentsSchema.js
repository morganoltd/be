const { gql } = require('apollo-server-express');

const COMMENTS = gql`

type Comment {
  text: String!
  likes: Int!
  createdAt: String!
  username: String!
}

type Query {
  All_Comments: [Comment]
  CommentsQuery(title: String!): [Comment]
}

type Mutation {
  addComment(username: String!, title: String!, text: String!): Comment
}

`;

module.exports = COMMENTS;