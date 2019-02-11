import * as React from "react";
import { Query } from "react-apollo";
import { FEED_QUERY } from "../queries";
import { FeedQuery } from "../__generated__/FeedQuery";
import Link, { UpdateStoreAfterVote } from "./Link";
export interface Props {
  name: string;
}

function Links({ name }: Props) {
  const updateStoreAfterVote: UpdateStoreAfterVote = function updateStoreAfterVote(
    store,
    createVote,
    linkId
  ) {
    const data: FeedQuery = store.readQuery({ query: FEED_QUERY });
    const votedLink = data.feed.links.find(link => link.id === linkId);
    if (votedLink) {
      votedLink.votes = createVote.link.votes;
      store.writeQuery({ query: FEED_QUERY, data });
    }
  };

  return (
    <div>
      <h1>{name}</h1>
      <Query<FeedQuery> query={FEED_QUERY}>
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
                data.feed.links.map((link, idx) => (
                  <Link
                    key={link.id}
                    {...link}
                    index={idx}
                    updateStoreAfterVote={updateStoreAfterVote}
                  />
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
