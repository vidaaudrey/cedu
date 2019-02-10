import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { auth } from "./Mutation/auth";
import { post } from "./Mutation/post";
import { User } from "./User";
import { Post } from "./Post";
import { Link } from "./Link";
import { Vote } from "./Vote";

export default {
  Query,
  Mutation: {
    ...auth,
    ...post
  },
  Subscription,
  User,
  Post,
  Link,
  Vote
};
