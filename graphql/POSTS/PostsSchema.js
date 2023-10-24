const { gql } = require("apollo-server-express");

const POSTS = gql`
  type Post {
    id: ID
    background: Background
    postFooter: PostFooter
    sticker: Sticker
    stickerPost: StickerPost
    title: Title
    titlePost: TitlePost
    utils: Utils
  }

  type Background {
    backgroundFilter: String
    selectedBackground: String
  }

  type PostFooter {
    hashtag: String!
    likes: Int
    username: String!
    views: Int
  }

  type Sticker {
    selectedSticker: String
    stickerFilter: String
    stickerMargin: Int
    stickerWidth: Int
  }

  type StickerPost {
    stickerPostMargin: Int
    stickerPostWidth: Int
  }

  type Title {
    title: String!
    titleMarginHor: Int
    titleMarginVer: Int
    titleFont: String
    titleFontSize: Int
    titleColor: String
    titleStyle: String
    titleShadow: String
    titleLetter: String
    titleWeight: String
    titleItalic: String
    titleUnderline: String
    titleBreak: Int
    titleAlign: String
    titleHeight: Int
    titleSpacing: Int
  }

  type TitlePost {
    titlePostFontSize: Int
    titlePostMarginHor: Int
    titlePostMarginVer: Int
    titlePostBreak: Int
    titlePostSpacing: Int
    titlePostHeight: Int
    titlePostAlign: String
  }

  type Utils {
    createdAt: String
    format: String!
    games: [String]!
    published: Boolean
    email: String!
  }

  type Query {
    All_Posts: [Post]
    get_all_user_posts(username: String!): [Post]
    get_user_post(postId: ID!): Post
    getPostsByGame(game: String!): [Post]
  }

  type Mutation {
    addPost(
      games: [ID!]!
      backgroundFilter: String
      selectedBackground: String
      hashtag: String!
      likes: Int
      username: String!
      views: Int
      selectedSticker: String
      stickerFilter: String
      stickerMargin: Int
      stickerWidth: Int
      stickerPostMargin: Int
      stickerPostWidth: Int
      title: String!
      titleMarginHor: Int
      titleMarginVer: Int
      titleFont: String
      titleFontSize: Int
      titleColor: String
      titleStyle: String
      titleShadow: String
      titleLetter: String
      titleWeight: String
      titleItalic: String
      titleUnderline: String
      titleBreak: Int
      titleAlign: String
      titleHeight: Int
      titleSpacing: Int
      titlePostFontSize: Int
      titlePostMarginHor: Int
      titlePostMarginVer: Int
      titlePostBreak: Int
      titlePostSpacing: Int
      titlePostHeight: Int
      titlePostAlign: String
      createdAt: String
      format: String!
      published: Boolean
      email: String!
    ): Post!

    incrementPostViews(postId: ID!): Post!
    likePost(postId: ID!): Post!
    unlikePost(postId: ID!): Post!
  }
`;

module.exports = POSTS;
