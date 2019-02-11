/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedQuery
// ====================================================

export interface FeedQuery_feed_links_votes_user {
  __typename: "User";
  id: string;
}

export interface FeedQuery_feed_links_votes {
  __typename: "Vote";
  id: string;
  user: FeedQuery_feed_links_votes_user;
}

export interface FeedQuery_feed_links_postedBy {
  __typename: "User";
  name: string;
  id: string;
}

export interface FeedQuery_feed_links {
  __typename: "Link";
  id: string;
  createdAt: any;
  url: string;
  description: string;
  votes: FeedQuery_feed_links_votes[];
  postedBy: FeedQuery_feed_links_postedBy | null;
}

export interface FeedQuery_feed {
  __typename: "Feed";
  links: FeedQuery_feed_links[];
}

export interface FeedQuery {
  feed: FeedQuery_feed;
}
