import { gql } from "@apollo/client";

export const getCommentsForPost = gql`
  query Query($postId: String!) {
    getCommentsForPost(postID: $postId) {
      commentID
      createdAt
      likes
      text
      userID
    }
  }
`;

export const All_Comments = gql`
  query All_Comments {
    All_Comments {
      commentID
      text
      likes
      createdAt
      userID
    }
  }
`;

export const addComment = gql`
  mutation Mutation($userId: String!, $postId: String!, $commentText: String!) {
    addComment(userID: $userId, postID: $postId, commentText: $commentText) {
      commentID
      createdAt
      likes
      text
      userID
    }
  }
`;

export const MutationLikeComment = gql`
  mutation Mutation($commentID: String!) {
    likeComment(commentID: $commentID)
  }
`;

export const MutationUnlikeComment = gql`
  mutation UnlikeComment($commentID: String!) {
    unlikeComment(commentID: $commentID)
  }
`;
