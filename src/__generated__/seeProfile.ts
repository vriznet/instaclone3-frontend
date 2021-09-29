/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  username: string;
  firstName: string;
  lastName: string | null;
  bio: string | null;
  avatarURL: string | null;
  totalFollowers: number;
  totalFollowing: number;
  isMe: boolean;
  isFollowing: boolean;
  photos: (seeProfile_seeProfile_photos | null)[] | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile;
}

export interface seeProfileVariables {
  username: string;
}
