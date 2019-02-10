import { getUserId, Context } from "../utils";

export const Query = {
  posts(parent, args, ctx: Context) {
    return ctx.prisma.posts({ where: { published: true } });
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx);

    const where = {
      published: false,
      author: {
        id
      }
    };

    return ctx.prisma.posts({ where });
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.post({ id });
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },

  async feed(parent, args, context: Context) {
    const count = await context.prisma
      .linksConnection({
        where: {
          OR: [
            { description_contains: args.filter },
            { url_contains: args.filter }
          ]
        }
      })
      .aggregate()
      .count();
    const links = await context.prisma.links({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy
    });

    return {
      count,
      links
    };
  }
};
