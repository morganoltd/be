const { gql } = require('apollo-server-express');

const POSTS = gql`

type postTitle {
  title: String!
  text: String!
  createdAt: String
  likes: Int
  views: Int
  hashtag: String!
  tags: [String]!
  games: [String]!
  store: PostStore
  photos: Photos
  videos: Videos
  styles: Styles
}

type PostStore {
  bg: String
  game: String
}

type Photos {
  firstphoto: Photo
  secondphoto: Photo
}

type Photo {
  url: String!
  description: String
}

type Videos {
  firstvideo: Video
  secondvideo: Video
}

type Video {
  url: String!
  description: String
}

type Styles {
  fontTitle: String
  fontText: String
  positionTitle: String
  positionText: String
}

type Query {
  All_Posts: [postTitle]
  get_user_posts(username: String!): [postTitle]
}

type Mutation {
  addPost(postTitle: String!, username: String!, text: String!, hashtag: [String!]!, games: [ID!]!): postTitle!
}

`;

module.exports = POSTS;