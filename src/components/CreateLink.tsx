import * as React from "react";
import { Mutation } from "react-apollo";
import { CreateLinkMutation as MUTATION } from "../queries";
import {
  CreateLinkMutation,
  CreateLinkMutationVariables
} from "../__generated__/CreateLinkMutation";

export interface Props {}

function CreateLink({  }: Props) {
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
          mutation={MUTATION}
          variables={{ description, url }}
        >
          {mutate => <button onClick={() => mutate()}>Submit</button>}
        </Mutation>
      </div>
    </div>
  );
}

export default CreateLink;
