import * as React from "react";
import { Mutation } from "react-apollo";
import { CREATE_LINK_MUTATION, FEED_QUERY } from "../queries";
import {
  CreateLinkMutation,
  CreateLinkMutationVariables
} from "../__generated__/CreateLinkMutation";
import { History } from "history";
import { FeedQuery } from "../__generated__/FeedQuery";
import { LINKS_PER_PAGE } from "../constants";

export interface Props {
  history: History;
}

function CreateLink({ history }: Props) {
  const [description, setDescription] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => setUrl(e.target.value)}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation<CreateLinkMutation, CreateLinkMutationVariables>
          mutation={CREATE_LINK_MUTATION}
          variables={{ description, url }}
          onCompleted={() => history.push("/new/1")}
          update={(store, { data: postData }) => {
            const first = LINKS_PER_PAGE;
            const skip = 0;
            const orderBy = "createdAt_DESC";
            const data: FeedQuery | null = store.readQuery({
              query: FEED_QUERY,
              variables: { first, skip, orderBy }
            });

            if (data && postData && postData.post) {
              data.feed.links.unshift(postData.post);
              store.writeQuery({
                query: FEED_QUERY,
                data,
                variables: { first, skip, orderBy }
              });
            }
          }}
        >
          {mutate => <button onClick={() => mutate()}>Submit</button>}
        </Mutation>
      </div>
    </div>
  );
}

export default CreateLink;
