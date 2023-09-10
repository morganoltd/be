import { gql } from "@apollo/client";

export const GAMES = gql`
  query {
    all_games {
    id
    title
    developer
    publisher
    genre
    mode
    store {
      billboard
      card {
        url
        position
      }
      block
      gameplay
    }
    platforms
    release {
      day
      month
      year
    }
    description
    tags
  }
}
`;
