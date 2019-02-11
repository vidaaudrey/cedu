/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VoteMutation
// ====================================================

export interface VoteMutation_vote_link_votes_user {
  __typename: "User";
  id: string;
}

export interface VoteMutation_vote_link_votes {
  __typename: "Vote";
  id: string;
  user: VoteMutation_vote_link_votes_user;
}

export interface VoteMutation_vote_link {
  __typename: "Link";
  votes: VoteMutation_vote_link_votes[];
}

export interface VoteMutation_vote_user {
  __typename: "User";
  id: string;
}

export interface VoteMutation_vote {
  __typename: "Vote";
  id: string;
  link: VoteMutation_vote_link;
  user: VoteMutation_vote_user;
}

export interface VoteMutation {
  vote: VoteMutation_vote;
}

export interface VoteMutationVariables {
  linkId: string;
}
