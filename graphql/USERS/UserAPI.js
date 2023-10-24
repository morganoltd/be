import { gql } from "@apollo/client";

export const QueryUSERS = gql`
  query {
    All_Users {
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
        likedPosts
        likedComments
        views
        subbedBy
          subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
      }
    }
  }
`;

export const getUser = gql`
  query Query($getUserId: ID!) {
    get_user(id: $getUserId) {
      account {
        country
        createdAt
        email
        role
        uid
        username
      }
      profile {
        avatar
        billboard
        games
        likedPosts
        likedComments
        subbedBy
        subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
        views
      }
    }
  }
`;

export const MutationUSERS = gql`
  mutation addUser(
    $username: String!
    $password: String!
    $games: [String]!
    $email: String!
    $country: String!
  ) {
    addUser(
      username: $username
      password: $password
      games: $games
      email: $email
      country: $country
    ) {
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
        likedPosts
        likedComments
        views
        subbedBy
          subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
      }
    }
  }
`;

export const MutationAddUserGame = gql`
  mutation Mutation($userId: String!, $gameId: String!) {
    addUserGame(userId: $userId, gameId: $gameId) {
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
        likedPosts
        likedComments
        views
        subbedBy
          subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
      }
    }
  }
`;

export const MutationDeleteUserGame = gql`
  mutation Mutation($userId: String!, $gameId: String!) {
    deleteUserGame(userId: $userId, gameId: $gameId) {
      profile {
        social {
          facebook
        x
        youtube
        twitch
        }
        games
        billboard
        avatar
      }
      account {
        username
        uid
        role
        email
        createdAt
        country
      }
    }
  }
`;

export const MutationLikeUserPost = gql`
  mutation AddLikedPost($userId: String!, $postId: String!) {
    addLikedPost(userId: $userId, postId: $postId) {
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
        likedPosts
        likedComments
        views
        subbedBy
          subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
      }
    }
  }
`;

export const MutationViewUserPost = gql`
  mutation AddViewedPost($userId: String!, $postId: String!) {
    addViewedPost(userId: $userId, postId: $postId) {
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
        likedPosts
        likedComments
        views
        subbedBy
          subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
      }
    }
  }
`;

export const MutationDeleteLikeUserPost = gql`
  mutation DeleteLikedPost($userId: String!, $postId: String!) {
    deleteLikedPost(userId: $userId, postId: $postId) {
      account {
        country
        createdAt
        email
        role
        uid
        username
      }
      profile {
        avatar
        billboard
        games
        likedPosts
        likedComments
        subbedBy
          subbedTo
        social {
          facebook
        x
        youtube
        twitch
        }
        views
      }
    }
  }
`;

export const MutationLikeUserComment = gql`
mutation AddLikedComment($userId: String!, $commentID: String!) {
  addLikedComment(userId: $userId, commentID: $commentID) {
    account {
      country
      createdAt
      email
      role
      uid
      username
    }
    profile {
      avatar
      billboard
      games
      likedComments
      likedPosts
      subbedBy
          subbedTo
      social {
        facebook
        x
        youtube
        twitch
      }
      views
    }
  }
}
`;

export const MutationDeleteLikeUserComment = gql`
mutation DeleteLikedComment($userId: String!, $commentID: String!) {
  deleteLikedComment(userId: $userId, commentID: $commentID) {
    account {
      country
      createdAt
      email
      role
      uid
      username
    }
    profile {
      avatar
      billboard
      games
      likedComments
      likedPosts
      subbedBy
          subbedTo
      social {
        facebook
        x
        youtube
        twitch
      }
      views
    }
  }
}
`;

export const MutationUpdateUserData = gql`
mutation UpdateUserData($userId: String!, $input: UpdateUserDataInput!) {
  updateUserData(userId: $userId, input: $input) {
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
        x
        youtube
        twitch
      }
      likedPosts
      likedComments
      views
      subbedBy
      subbedTo
    }
  }
}
`;

export const DeleteUser = gql`
mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId) {
    message
    success
  }
}
`;

export const UpdateEmailUser = gql`
mutation UpdateUserEmail($userId: String!, $newEmail: String!) {
  updateUserEmail(userId: $userId, newEmail: $newEmail) {
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
        x
        youtube
        twitch
      }
      achievements {
        accepted
        finished
      }
      liked
      likedPosts
      likedComments
      views
      subbedBy
      subbedTo
    }
  }
}
`;

export const UpdatePasswordUser = gql`
mutation UpdateUserPassword($userId: String!, $newPassword: String!) {
  updateUserPassword(userId: $userId, newPassword: $newPassword) {
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
        x
        youtube
        twitch
      }
      achievements {
        accepted
        finished
      }
      liked
      likedPosts
      likedComments
      views
      subbedBy
      subbedTo
    }
  }
}
`;

export const SubscribeUser = gql`
mutation Mutation($userId: String!, $targetUserId: String!) {
  subscribeUser(userId: $userId, targetUserId: $targetUserId) {
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
        x
        youtube
        twitch
      }
      achievements {
        accepted
        finished
      }
      liked
      likedPosts
      likedComments
      views
      subbedBy
      subbedTo
    }
  }
}
`;

export const UnsubscribeUser = gql`
mutation UnsubscribeUser($userId: String!, $targetUserId: String!) {
  unsubscribeUser(userId: $userId, targetUserId: $targetUserId) {
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
        x
        youtube
        twitch
      }
      achievements {
        accepted
        finished
      }
      liked
      likedPosts
      likedComments
      views
      subbedBy
      subbedTo
    }
  }
}
`;