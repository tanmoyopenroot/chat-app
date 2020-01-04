import _ from 'lodash';

export default {
  Query: {
    channelsByTeam: async (parent, { teamId }, { models }) => models.Channel.findAll({
      where: { teamId },
    }),
  },
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        const channel = await models.Channel.create(args);
        return {
          ok: true,
          channel,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: error.errors.map((x) => _.pick(x, ['path', 'message'])),
        };
      }
    },
  },
};
