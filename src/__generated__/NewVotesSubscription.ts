/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewVotesSubscription
// ====================================================

export interface NewVotesSubscription_newVote_link_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface NewVotesSubscription_newVote_link_votes_user {
  __typename: "User";
  id: string;
}

export interface NewVotesSubscription_newVote_link_votes {
  __typename: "Vote";
  id: string;
  user: NewVotesSubscription_newVote_link_votes_user;
}

export interface NewVotesSubscription_newVote_link {
  __typename: "Link";
  id: string;
  url: string;
  description: string;
  createdAt: any;
  postedBy: NewVotesSubscription_newVote_link_postedBy | null;
  votes: NewVotesSubscription_newVote_link_votes[];
}

export interface NewVotesSubscription_newVote_user {
  __typename: "User";
  id: string;
}

export interface NewVotesSubscription_newVote {
  __typename: "Vote";
  id: string;
  link: NewVotesSubscription_newVote_link;
  user: NewVotesSubscription_newVote_user;
}

export interface NewVotesSubscription {
  newVote: NewVotesSubscription_newVote | null;
}
