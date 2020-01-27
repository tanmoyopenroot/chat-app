export default {
  Query: {
    messages: async (parent, { channelId }, { models }) => models.Message
      .findAll(
        {
          order: [['createdAt', 'ASC']],
          where: { channelId },
        },
        { raw: true },
      ),
  },
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      try {
        await models.Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
