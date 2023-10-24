const { gql } = require('apollo-server-express');

const COMMENTS = gql`
  type Comment {
    commentID: String!
    text: String!
    likes: Int!
    createdAt: String
    userID: String
  }

  type Query {
    All_Comments: [Comment!]!
    getCommentsForPost(postID: String!): [Comment]
  }

  type Mutation {
    addComment(userID: String!, postID: String!, commentText: String!): Comment
    deleteComment(commentID: String!): Boolean
    updateComment(commentID: String!, commentText: String!): Boolean
    
    likeComment(commentID: String!): Boolean
    unlikeComment(commentID: String!): Boolean
  }
`;

module.exports = COMMENTS;