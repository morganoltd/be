import { gql } from "@apollo/client";

export const COMMENTS = gql`

query {
  All_Comments {
    text
    likes
    createdAt
    username
  }
}
`;

