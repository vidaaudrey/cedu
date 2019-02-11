import * as React from "react";
import { Query } from "react-apollo";
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION
} from "../queries";
import { FeedQuery } from "../__generated__/FeedQuery";
import Link, { UpdateStoreAfterVote } from "./Link";
import { NewLinksSubscription } from "../__generated__/NewLinksSubscription";
import { NewVotesSubscription } from "../__generated__/NewVotesSubscription";

export interface Props {
  name: string;
}

function LinkList({ name }: Props) {
  const updateCacheAfterVote: UpdateStoreAfterVote = function updateCacheAfterVote(
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
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <h2>loading</h2>;
          }
          if (error) {
            return <h2>error</h2>;
          }

          // update the store inline for easy ts typing
          // subscribe to links
          subscribeToMore<NewLinksSubscription>({
            document: NEW_LINKS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data || !subscriptionData.data.newLink) {
                return prev;
              }
              const newLink = subscriptionData.data.newLink;
              const exists = prev.feed.links.find(
                ({ id }) => id === newLink.id
              );
              if (exists) {
                return prev;
              }
              return Object.assign({}, prev, {
                feed: {
                  links: [newLink, ...prev.feed.links],
                  count: prev.feed.links.length + 1,
                  __typename: prev.feed.__typename
                }
              });
            }
          });
          // subscribe to votes
          subscribeToMore<NewVotesSubscription>({
            document: NEW_VOTES_SUBSCRIPTION
          });

          return (
            <ul>
              {data &&
                data.feed.links.map((link, idx) => (
                  <Link
                    key={link.id}
                    {...link}
                    index={idx}
                    updateCacheAfterVote={updateCacheAfterVote}
                  />
                ))}
            </ul>
          );
        }}
      </Query>
    </div>
  );
}

LinkList.defaultProps = { name: "links" };

export default LinkList;
