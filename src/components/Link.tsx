import * as React from "react";
import { Mutation } from "react-apollo";
import { VOTE_MUTATION } from "../queries";
import { FeedQuery_feed_links } from "../__generated__/FeedQuery";
import {
  VoteMutation,
  VoteMutationVariables,
  VoteMutation_vote
} from "../__generated__/VoteMutation";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils/utils";

export type UpdateStoreAfterVote = (
  store: any,
  vote: VoteMutation_vote,
  id: string
) => void;

export interface Props extends FeedQuery_feed_links {
  index: number;
  updateCacheAfterVote: UpdateStoreAfterVote;
}

function Link({
  id,
  description,
  votes,
  postedBy,
  createdAt,
  url,
  index,
  updateCacheAfterVote
}: Props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <li className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <Mutation<VoteMutation, VoteMutationVariables>
            mutation={VOTE_MUTATION}
            variables={{ linkId: id }}
            update={(store, { data }) => {
              if (data && data.vote) {
                updateCacheAfterVote(store, data.vote, id);
              }
            }}
          >
            {voteMutation => (
              <div
                className="ml1 gray f11"
                style={{ cursor: "pointer" }}
                onClick={() => voteMutation()}
              >
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {votes.length} votes | by {postedBy ? postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </li>
  );
}

Link.defaultProps = {
  updateCacheAfterVote: () => {}
};
export default Link;
