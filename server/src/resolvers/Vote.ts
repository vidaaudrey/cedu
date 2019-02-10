import { Context } from "../utils";

export const Vote = {
  link: (parent, args, context: Context) => {
    return context.prisma.vote({ id: parent.id }).link();
  },
  user: (parent, args, context: Context) => {
    return context.prisma.vote({ id: parent.id }).user();
  }
};
