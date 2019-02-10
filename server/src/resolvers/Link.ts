import { Context } from "../utils";

export const Link = {
  postedBy: (parent, args, context: Context) => {
    return context.prisma.link({ id: parent.id }).postedBy();
  },
  votes: (parent, args, context: Context) => {
    return context.prisma.link({ id: parent.id }).votes();
  }
};
