const { gql } = require('apollo-server-express');

const POST = gql`
type Post {
  footer: Footer!
  field: Field!
}


  type Footer {
    hashtag: String!
    views: Int!
    likes: Int!
    user: String!
  }

  type Field {
    bg: String!
    gamePost: String!
    title: String!
  }
  type Query {
    Post_Test: [Post]
  }


`;

module.exports = POST;