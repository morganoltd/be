import { gql } from "@apollo/client";

export const POSTS = gql`
query {
    All_Posts {
      title
      text
      createdAt
      likes
      views
      hashtags
      tags
      games
      store {
        bg
        game
      }
      photos {
        firstphoto {
          url
          description
        }
        secondphoto {
          url
          description
        }
      }
      videos {
        firstvideo {
          url
          description
        }
        secondvideo {
          url
          description
        }
      }
      styles {
        fontTitle
        fontText
        positionTitle
        positionText
      }
    }
  }
`;