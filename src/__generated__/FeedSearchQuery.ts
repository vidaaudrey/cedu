/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedSearchQuery
// ====================================================

export interface FeedSearchQuery_feed_links_postedBy {
  __typename: "User";
  id: string;
  name: string;
}

export interface FeedSearchQuery_feed_links_votes_user {
  __typename: "User";
  id: string;
}

export interface FeedSearchQuery_feed_links_votes {
  __typename: "Vote";
  id: string;
  user: FeedSearchQuery_feed_links_votes_user;
}

export interface FeedSearchQuery_feed_links {
  __typename: "Link";
  id: string;
  url: string;
  description: string;
  createdAt: any;
  postedBy: FeedSearchQuery_feed_links_postedBy | null;
  votes: FeedSearchQuery_feed_links_votes[];
}

export interface FeedSearchQuery_feed {
  __typename: "Feed";
  links: FeedSearchQuery_feed_links[];
}

export interface FeedSearchQuery {
  feed: FeedSearchQuery_feed;
}

export interface FeedSearchQueryVariables {
  filter: string;
}
