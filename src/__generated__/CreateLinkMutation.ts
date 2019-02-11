/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLinkMutation
// ====================================================

export interface CreateLinkMutation_post {
  __typename: "Link";
  id: string;
  createdAt: any;
  url: string;
  description: string;
}

export interface CreateLinkMutation {
  post: CreateLinkMutation_post;
}

export interface CreateLinkMutationVariables {
  description: string;
  url: string;
}
