/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewLinksSubscription
// ====================================================

export interface NewLinksSubscription_newLink_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface NewLinksSubscription_newLink_votes_user {
  __typename: "User";
  id: string;
}

export interface NewLinksSubscription_newLink_votes {
  __typename: "Vote";
  id: string;
  user: NewLinksSubscription_newLink_votes_user;
}

export interface NewLinksSubscription_newLink {
  __typename: "Link";
  id: string;
  url: string;
  description: string;
  createdAt: any;
  postedBy: NewLinksSubscription_newLink_postedBy | null;
  votes: NewLinksSubscription_newLink_votes[];
}

export interface NewLinksSubscription {
  newLink: NewLinksSubscription_newLink | null;
}
