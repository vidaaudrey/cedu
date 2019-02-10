import { getUserId, Context } from "../../utils";

export const post = {
  async createDraft(parent, { title, content }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createPost({
      title,
      content,
      author: {
        connect: { id: userId }
      }
    });
  },

  async publish(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.prisma.$exists.post({
      id,
      author: { id: userId }
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.prisma.updatePost({
      where: { id },
      data: { published: true }
    });
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.prisma.$exists.post({
      id,
      author: { id: userId }
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.prisma.deletePost({ id });
  },

  async vote(parent, args, context: Context, info) {
    const userId = getUserId(context);
    const linkExists = await context.prisma.$exists.vote({
      user: { id: userId },
      link: { id: args.linkId }
    });
    if (linkExists) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    return context.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } }
    });
  },

  post(parent, { url, description }, context: Context, info) {
    return context.prisma.createLink({
      url,
      description
    });
  }
};
