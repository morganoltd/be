import { gql } from "@apollo/client";

export const QueryUSERS = gql`
  query All_Users {
    All_Users {
    account {
      username
      createdAt
      email
      country
    }
    profile {
      avatar
      billboard
      games
      social {
        facebook
        twitter
        youtube
      }
    }
  }
  }
`;

export const MutationUSERS = gql`
  mutation addUser($username: String!, $password: String!, $games: [String]!, $email: String!, $country: String!) {
    addUser(username: $username, password: $password, games: $games, email: $email, country: $country) {
      account {
        uid
        username
        createdAt
        email
        country
        role
      }
      profile {
        avatar
        billboard
        games
        social {
          facebook
          twitter
          youtube
        }
      }
    }
  }
`;