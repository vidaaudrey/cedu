/* tslint:disable */
// This file was automatically generated and should not be edited.

import { LinkOrderByInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FeedQuery
// ====================================================

export interface FeedQuery_feed_links_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface FeedQuery_feed_links_votes_user {
  __typename: "User";
  id: string;
}

export interface FeedQuery_feed_links_votes {
  __typename: "Vote";
  id: string;
  user: FeedQuery_feed_links_votes_user;
}

export interface FeedQuery_feed_links {
  __typename: "Link";
  id: string;
  createdAt: any;
  url: string;
  description: string;
  postedBy: FeedQuery_feed_links_postedBy | null;
  votes: FeedQuery_feed_links_votes[];
}

export interface FeedQuery_feed {
  __typename: "Feed";
  links: FeedQuery_feed_links[];
  count: number;
}

export interface FeedQuery {
  feed: FeedQuery_feed;
}

export interface FeedQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: LinkOrderByInput | null;
}
