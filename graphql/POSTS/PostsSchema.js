const { gql } = require("apollo-server-express");

const POSTS = gql`
  type Post {
    id: ID
    background: Background
    postFooter: PostFooter
    sticker: Sticker
    stickerPost: StickerPost
    title: Title
    text: Text
    newTextSections: [TextNewSection]
    headSections: [HeadNewSection]
    titlePost: TitlePost
    utils: Utils
    video: Video
    images: Images
    entry: Entry
  }

  type Entry {
    entry: String
    entryFont: String
    entrySize: Int
    entryMarginHor: Int
    entryMarginVer: Int
    entryColor: String
    entryColorAvatar: String
    entryLetter: String
    entryAlign: String
    entryWeight: String
    entryItalic: String
    entryUnderline: String
    entryBreak: Int
    entrySpacing: Int
    entryHeight: Int
  }

  type Video {
    selectedVideo: String
    nameVideo: String
    videoPlayer: String
    videoTitle: String
    videoSize: Int
    videoColor: String
    videoColorBackground: String
    videoMarginHor: Int
    videoMarginVer: Int
  }

  type Images {
    selectedImages: [String]
    nameImages: [String]
    imagesSize: [Int]
    imagesSlider: String
    imagesPadding: Int
    imagesMarginHor: Int
    imagesMarginVer: Int
    imagesBorder: String
    imagesBorderRadius: Int
    imagesShadow: String
    imagesColor: String
    imagesEffectSize: String
    imagesEffectBlack: String
    imagesEffectShadow: String
  }

  type Background {
    selectedBackground: String
    selectedBackgroundTitle: String
    backgroundColor: String
  }

  type PostFooter {
    hashtag: String!
    likes: Int
    username: String!
    views: Int
  }

  type Sticker {
    selectedSticker: String
    selectedStickerTitle: String
    stickerBlack: String
    stickerOpacity: Float
    stickerReverse: Int
    stickerMarginHor: Int
    stickerMarginVer: Int
    stickerWidth: Int
  }

  type StickerPost {
    stickerPostMarginHor: Int
    stickerPostMarginVer: Int
    stickerPostWidth: Int
  }

  type Title {
    title: String
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

  type Text {
    text: String
    textMarginHor: Int
    textMarginVer: Int
    textFont: String
    textFontSize: Int
    textColor: String
    textStyle: String
    textShadow: String
    textLetter: String
    textWeight: String
    textItalic: String
    textUnderline: String
    textBreak: Int
    textAlign: String
    textHeight: Int
    textSpacing: Int
  }

  type TextNewSection {
    newText: String
    newTextFontSize: Int
    newTextMarginHor: Int
    newTextMarginVer: Int
    newTextFont: String
    newTextColor: String
    newTextStyle: String
    newTextShadow: String
    newTextLetter: String
    newTextWeight: String
    newTextItalic: String
    newTextUnderline: String
    newTextBreak: Int
    newTextAlign: String
    newTextSpacing: Int
    newTextHeight: Int
  }

  input TextNewSectionInput {
    newText: String
    newTextFontSize: Int
    newTextMarginHor: Int
    newTextMarginVer: Int
    newTextFont: String
    newTextColor: String
    newTextStyle: String
    newTextShadow: String
    newTextLetter: String
    newTextWeight: String
    newTextItalic: String
    newTextUnderline: String
    newTextBreak: Int
    newTextAlign: String
    newTextSpacing: Int
    newTextHeight: Int
  }

  type HeadNewSection {
    head: String
    headFontSize: Int
    headMarginHor: Int
    headMarginVer: Int
    headFont: String
    headColor: String
    headStyle: String
    headShadow: String
    headLetter: String
    headWeight: String
    headItalic: String
    headUnderline: String
    headBreak: Int
    headAlign: String
    headSpacing: Int
    headHeight: Int
  }

  input HeadNewSectionInput {
    head: String
    headFontSize: Int
    headMarginHor: Int
    headMarginVer: Int
    headFont: String
    headColor: String
    headStyle: String
    headShadow: String
    headLetter: String
    headWeight: String
    headItalic: String
    headUnderline: String
    headBreak: Int
    headAlign: String
    headSpacing: Int
    headHeight: Int
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

  type DeletePostResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    addPost(
      games: [ID!]!
      selectedBackground: String
      selectedBackgroundTitle: String
      backgroundColor: String
      hashtag: String!
      likes: Int
      username: String!
      views: Int
      selectedSticker: String
      selectedStickerTitle: String
      stickerBlack: String
      stickerOpacity: Float
      stickerReverse: Int
      stickerMarginHor: Int
      stickerMarginVer: Int
      stickerWidth: Int
      stickerPostMarginHor: Int
      stickerPostMarginVer: Int
      stickerPostWidth: Int
      title: String
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
      text: String
      textMarginHor: Int
      textMarginVer: Int
      textFont: String
      textFontSize: Int
      textColor: String
      textStyle: String
      textShadow: String
      textLetter: String
      textWeight: String
      textItalic: String
      textUnderline: String
      textBreak: Int
      textAlign: String
      textHeight: Int
      textSpacing: Int
      createdAt: String
      format: String!
      published: Boolean
      email: String
      newTextSections: [TextNewSectionInput]
      headSections: [HeadNewSectionInput]
      selectedVideo: String
      nameVideo: String
      videoPlayer: String
      videoTitle: String
      videoSize: Int
      videoColor: String
      videoColorBackground: String
      videoMarginHor: Int
      videoMarginVer: Int
      selectedImages: [String]
      nameImages: [String]
      imagesSize: [Int]
      imagesSlider: String
      imagesPadding: Int
      imagesMarginHor: Int
      imagesMarginVer: Int
      imagesBorder: String
      imagesBorderRadius: Int
      imagesShadow: String
      imagesColor: String
      imagesEffectSize: String
      imagesEffectBlack: String
      imagesEffectShadow: String
      entry: String
      entryFont: String
      entrySize: Int
      entryMarginHor: Int
      entryMarginVer: Int
      entryColor: String
      entryColorAvatar: String
      entryLetter: String
      entryAlign: String
      entryWeight: String
      entryItalic: String
      entryUnderline: String
      entryBreak: Int
      entrySpacing: Int
      entryHeight: Int

    ): Post!

    incrementPostViews(postId: ID!): Post!
    likePost(postId: ID!): Post!
    unlikePost(postId: ID!): Post!
    deletePost(postId: ID!): DeletePostResponse!
  }
`;

module.exports = POSTS;
