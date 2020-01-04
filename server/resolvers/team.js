import _ from 'lodash';
import { requiresAuth } from '../permission';

export default {
  Query: {
    allTeams: requiresAuth.createResolver(
      (parent, args, { models, user }) => models.Team.findAll({ where: { owner: user.id } }),
    ),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.create({ ...args, owner: user.id });
        await models.Channel.create({ name: 'general', public: true, teamId: team.id });

        return {
          ok: true,
          team,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: error.errors.map((x) => _.pick(x, ['path', 'message'])),
        };
      }
    }),
  },
};
