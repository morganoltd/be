import { gql } from "@apollo/client";

export const MutationPOSTS = gql`
  mutation AddPost(
    $games: [ID!]!
    $hashtag: String!
    $username: String!
    $title: String!
    $format: String!
    $email: String!
    $backgroundFilter: String
    $selectedBackground: String
    $likes: Int
    $views: Int
    $selectedSticker: String
    $stickerFilter: String
    $stickerMargin: Int
    $stickerWidth: Int
    $stickerPostMargin: Int
    $stickerPostWidth: Int
    $titleMarginHor: Int
    $titleMarginVer: Int
    $titleFont: String
    $titleFontSize: Int
    $titleColor: String
    $titleStyle: String
    $titleShadow: String
    $titleLetter: String
    $titleWeight: String
    $titleItalic: String
    $titleUnderline: String
    $titleBreak: Int
    $titleAlign: String
    $titleHeight: Int
    $titleSpacing: Int
    $titlePostFontSize: Int
    $titlePostMarginHor: Int
    $titlePostMarginVer: Int
    $titlePostBreak: Int
    $titlePostSpacing: Int
    $titlePostHeight: Int
    $titlePostAlign: String
    $createdAt: String
    $published: Boolean
  ) {
    addPost(
      games: $games
      hashtag: $hashtag
      username: $username
      title: $title
      format: $format
      email: $email
      backgroundFilter: $backgroundFilter
      selectedBackground: $selectedBackground
      likes: $likes
      views: $views
      selectedSticker: $selectedSticker
      stickerFilter: $stickerFilter
      stickerMargin: $stickerMargin
      stickerWidth: $stickerWidth
      stickerPostMargin: $stickerPostMargin
      stickerPostWidth: $stickerPostWidth
      titleMarginHor: $titleMarginHor
      titleMarginVer: $titleMarginVer
      titleFont: $titleFont
      titleFontSize: $titleFontSize
      titleColor: $titleColor
      titleStyle: $titleStyle
      titleShadow: $titleShadow
      titleLetter: $titleLetter
      titleWeight: $titleWeight
      titleItalic: $titleItalic
      titleUnderline: $titleUnderline
      titleBreak: $titleBreak
      titleAlign: $titleAlign
      titleHeight: $titleHeight
      titleSpacing: $titleSpacing
      titlePostFontSize: $titlePostFontSize
      titlePostMarginHor: $titlePostMarginHor
      titlePostMarginVer: $titlePostMarginVer
      titlePostBreak: $titlePostBreak
      titlePostSpacing: $titlePostSpacing
      titlePostHeight: $titlePostHeight
      titlePostAlign: $titlePostAlign
      createdAt: $createdAt
      published: $published
    ) {
      background {
        backgroundFilter
        selectedBackground
      }
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;

export const QueryPOSTS = gql`
  query Query {
    All_Posts {
      background {
        backgroundFilter
        selectedBackground
      }
      id
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;

export const QueryAllUserPOSTS = gql`
  query Get_all_user_posts($username: String!) {
  get_all_user_posts(username: $username) {
      background {
        backgroundFilter
        selectedBackground
      }
      id
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;

export const QueryUserPOST = gql`
  query Query($postId: ID!) {
    get_user_post(postId: $postId) {
      background {
        backgroundFilter
        selectedBackground
      }
      id
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;

export const MutationIncrementPostViews = gql`
  mutation Mutation($postId: ID!) {
    incrementPostViews(postId: $postId) {
      background {
        backgroundFilter
        selectedBackground
      }
      id
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;

export const MutationLikePost = gql`
  mutation Mutation($postId: ID!) {
    likePost(postId: $postId) {
      background {
        backgroundFilter
        selectedBackground
      }
      id
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;

export const MutationUnlikePost = gql`
  mutation Mutation($postId: ID!) {
    unlikePost(postId: $postId) {
      background {
        backgroundFilter
        selectedBackground
      }
      id
      postFooter {
        hashtag
        likes
        username
        views
      }
      sticker {
        selectedSticker
        stickerFilter
        stickerMargin
        stickerWidth
      }
      stickerPost {
        stickerPostMargin
        stickerPostWidth
      }
      title {
        title
        titleMarginHor
        titleMarginVer
        titleFont
        titleFontSize
        titleColor
        titleStyle
        titleShadow
        titleLetter
        titleWeight
        titleItalic
        titleUnderline
        titleBreak
        titleAlign
        titleHeight
        titleSpacing
      }
      titlePost {
        titlePostFontSize
        titlePostMarginHor
        titlePostMarginVer
        titlePostBreak
        titlePostSpacing
        titlePostHeight
        titlePostAlign
      }
      utils {
        createdAt
        format
        games
        published
        email
      }
    }
  }
`;
