/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLinkMutation
// ====================================================

export interface CreateLinkMutation_post_votes_user {
  __typename: "User";
  id: string;
}

export interface CreateLinkMutation_post_votes {
  __typename: "Vote";
  id: string;
  user: CreateLinkMutation_post_votes_user;
}

export interface CreateLinkMutation_post_postedBy {
  __typename: "User";
  name: string;
  id: string;
}

export interface CreateLinkMutation_post {
  __typename: "Link";
  id: string;
  createdAt: any;
  url: string;
  description: string;
  votes: CreateLinkMutation_post_votes[];
  postedBy: CreateLinkMutation_post_postedBy | null;
}

export interface CreateLinkMutation {
  post: CreateLinkMutation_post;
}

export interface CreateLinkMutationVariables {
  description: string;
  url: string;
}
