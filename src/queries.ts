import gql from "graphql-tag";

export const GetFeedQuery = gql`
  query GetFeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;
