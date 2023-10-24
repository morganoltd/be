import { gql } from "@apollo/client";

export const MutationAUTH = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      email
    }
  }
`;
