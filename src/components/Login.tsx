import * as React from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "../queries";
import {
  LoginMutation,
  LoginMutationVariables
} from "../__generated__/LoginMutation";
import {
  SignupMutation,
  SignupMutationVariables
} from "../__generated__/SignupMutation";
import { AUTH_TOKEN } from "../constants";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  path: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

function Login({ history, match: { path }, ...rest }: Props) {
  console.log(path, rest);
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const [email, setemail] = React.useState<string>("");
  const [password, setpassword] = React.useState<string>("");
  const [name, setname] = React.useState<string>("");

  async function confirmAction(token: string | null) {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
      history.push(`/`);
    }
  }

  return (
    <div>
      <h4 className="mv3">{isLogin ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!isLogin && (
          <input
            value={name}
            onChange={e => setname(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={e => setemail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={e => setpassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        {isLogin ? (
          <Mutation<LoginMutation, LoginMutationVariables>
            mutation={LOGIN_MUTATION}
            variables={{ email, password }}
            onCompleted={data => confirmAction(data.login.token)}
          >
            {mutation => (
              <div
                className="pointer mr2 button"
                onClick={() => {
                  mutation();
                }}
              >
                Login
              </div>
            )}
          </Mutation>
        ) : (
          <Mutation<SignupMutation, SignupMutationVariables>
            mutation={SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => confirmAction(data.signup.token)}
          >
            {mutation => (
              <div
                className="pointer mr2 button"
                onClick={() => {
                  mutation();
                }}
              >
                create account
              </div>
            )}
          </Mutation>
        )}
        <div className="pointer button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
}

export default Login;
