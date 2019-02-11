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
import { LINKS_PER_PAGE } from "../constants";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  path: string;
  page?: string;
}

export interface Props extends RouteComponentProps<MatchParams> {
  name: string;
}

function LinkList({ name, location, match, history }: Props) {
  const currentPage = parseInt(match.params.page || "0", 10);
  const isNewPage = location.pathname.includes("new");
  const skip = isNewPage ? (currentPage - 1) * LINKS_PER_PAGE : 0;
  const first = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = isNewPage ? "createdAt_DESC" : null;
  const queryVariables = { first, skip, orderBy };

  const updateCacheAfterVote: UpdateStoreAfterVote = function updateCacheAfterVote(
    store,
    createVote,
    linkId
  ) {
    const data: FeedQuery = store.readQuery({
      query: FEED_QUERY,
      variables: queryVariables
    });
    const votedLink = data.feed.links.find(link => link.id === linkId);
    if (votedLink) {
      votedLink.votes = createVote.link.votes;
      store.writeQuery({ query: FEED_QUERY, data });
    }
  };

  function getLinksToRender(data: FeedQuery | undefined) {
    if (!data) return [];
    const isNewPage = location.pathname.includes("new");
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  }

  function nextPage(data: FeedQuery | undefined) {
    if (!data) return;
    const page = parseInt(match.params.page || "0", 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      history.push(`/new/${previousPage}`);
    }
  }

  return (
    <div>
      <h1>{name}</h1>
      <Query<FeedQuery> query={FEED_QUERY} variables={queryVariables}>
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

          const linksToRender = getLinksToRender(data);
          const isNewPage = location.pathname.includes("new");
          const pageIndex = match.params.page
            ? (+match.params.page - 1) * LINKS_PER_PAGE
            : 0;

          return (
            <>
              <ul>
                {linksToRender.map((link, idx) => (
                  <Link
                    key={link.id}
                    {...link}
                    index={idx + pageIndex}
                    updateCacheAfterVote={updateCacheAfterVote}
                  />
                ))}
              </ul>
              {isNewPage && (
                <div className="flex ml4 mv3 gray">
                  <div className="pointer mr2" onClick={previousPage}>
                    Previous
                  </div>
                  <div className="pointer" onClick={() => nextPage(data)}>
                    Next
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Query>
    </div>
  );
}

LinkList.defaultProps = { name: "links" };

export default LinkList;
