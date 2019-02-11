import * as React from "react";
import { Mutation, withApollo, WithApolloClient } from "react-apollo";
import { VOTE_MUTATION } from "../queries";
import Link from "./Link";
import {
  FeedSearchQuery,
  FeedSearchQuery_feed_links
} from "../__generated__/FeedSearchQuery";
import { FEED_SEARCH_QUERY } from "../queries";
import ApolloClient, { ApolloQueryResult } from "apollo-client";

interface Props {
  name: string;
}
type PropsInternal = WithApolloClient<Props>;

function Search({ client, name }: PropsInternal) {
  const [filter, setFilter] = React.useState<string>("");
  const [links, setLinks] = React.useState<FeedSearchQuery_feed_links[]>([]);
  async function onSearch(
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    ev.preventDefault();
    const result: ApolloQueryResult<FeedSearchQuery> = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });

    const links = result.data.feed.links;
    setLinks(links);
  }
  return (
    <div>
      <form onSubmit={onSearch}>
        Search
        <input type="text" onChange={e => setFilter(e.target.value)} />
        <button type="submit" onClick={onSearch}>
          OK
        </button>
      </form>
      {links.map((link, index) => (
        <Link key={link.id} {...link} index={index} />
      ))}
    </div>
  );
}

export default withApollo(Search);
