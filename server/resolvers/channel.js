import _ from 'lodash';
import { requiresAuth } from '../permission';

export default {
  Query: {
    channelsByTeam: async (parent, { teamId }, { models }) => models.Channel.findAll({
      where: { teamId },
    }),
  },
  Mutation: {
    createChannel: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const { teamId } = args;
          const team = models.Team.findOne({ where: { id: teamId } }, { raw: true });

          if (team.owner !== user.id) {
            return {
              ok: false,
              errors: [{
                path: 'name',
                message: 'You have to be owner of the team to create channel',
              }],
            };
          }

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
    ),
  },
};
