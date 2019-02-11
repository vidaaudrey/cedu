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

export const CreateLinkMutation = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
