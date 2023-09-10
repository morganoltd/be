import { gql } from "@apollo/client";

export const POST = gql`
  query {
    Post_Test {
      footer {
        hashtag
        views
        likes
        user
      }
      field {
        bg
        gamePost
        title
      }
    }
  }
`;
