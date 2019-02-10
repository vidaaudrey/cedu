import { Context } from "../utils";

export const User = {
  posts: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).posts();
  },
  links: ({ id }, args, context: Context) => {
    return context.prisma.user({ id }).links();
  }
};
