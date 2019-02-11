import * as React from "react";
import { Query } from "react-apollo";
import { GetFeedQuery as QUERY } from "../queries";
import { GetFeedQuery } from "../__generated__/GetFeedQuery";

export interface Props {
  name: string;
}

function Links({ name }: Props) {
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
}

Links.defaultProps = { name: "links" };

export default Links;
