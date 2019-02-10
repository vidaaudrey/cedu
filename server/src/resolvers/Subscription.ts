import { Context } from "../utils";

export const Subscription = {
  feedSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe
        .post({
          mutation_in: ["CREATED", "UPDATED"]
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  },

  newLink: {
    subscribe: (parent, args, context: Context, info) => {
      return context.prisma.$subscribe
        .link({ mutation_in: ["CREATED"] })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  },

  newVote: {
    subscribe: (parent, args, context: Context, info) => {
      return context.prisma.$subscribe
        .vote({ mutation_in: ["CREATED"] })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  }
};
