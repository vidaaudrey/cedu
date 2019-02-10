/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeedQuery
// ====================================================

export interface GetFeedQuery_feed_links {
  __typename: "Link";
  id: string;
  createdAt: any;
  url: string;
  description: string;
}

export interface GetFeedQuery_feed {
  __typename: "Feed";
  links: GetFeedQuery_feed_links[];
}

export interface GetFeedQuery {
  feed: GetFeedQuery_feed;
}
