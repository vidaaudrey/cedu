import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { GetFeedQuery as QUERY } from "../queries";
import { GetFeedQuery } from "../__generated__/GetFeedQuery";
import { string } from "prop-types";

interface Props {
  name: string;
}

const Links: React.SFC<Props> = function Links({ name = "Links" }) {
  return (
    <div>
      <h1>{name}</h1>
      <Query<GetFeedQuery> query={QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <h2>loading</h2>;
          }
          if (error) {
            return <h2>error</h2>;
          }

          return (
            <ul>
              {data &&
                data.feed.links.map(({ id, createdAt, url, description }) => (
                  <li key={id}>
                    {url}
                    {createdAt}
                    {description}
                  </li>
                ))}
            </ul>
          );
        }}
      </Query>
    </div>
  );
};

export default Links;
