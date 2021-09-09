/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "User";
  username: string;
  avatarURL: string | null;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: string;
  user: seeFeed_seeFeed_user | null;
  file: string;
  caption: string | null;
  likes: number;
  comments: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
}

export interface seeFeed {
  seeFeed: (seeFeed_seeFeed | null)[] | null;
}
