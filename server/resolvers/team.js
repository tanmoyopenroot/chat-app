import _ from 'lodash';
import { requiresAuth } from '../permission';

export default {
  Query: {
    allTeams: requiresAuth.createResolver(
      (parent, args, { models, user }) => models.Team.findAll(
        { where: { owner: user.id } },
        { raw: true },
      ),
    ),
    invitedTeams: requiresAuth.createResolver(
      (parent, args, { models, user }) => models.sequelize.query(
        `
          select * from teams
          inner join members on id = team_id
          where user_id = ?
        `,
        {
          replacements: [user.id],
          model: models.Team,
        },
      ),
      // models.Team.findAll(
      //   {
      //     include: [{
      //       model: models.User,
      //       where: { id: user.id },
      //     }],
      //   },
      //   { raw: true },
      // ),
    ),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      let transaction;
      try {
        transaction = await models.sequelize.transaction();

        const team = await models.Team.create({ ...args, owner: user.id }, { transaction });
        await models.Channel.create({ name: 'general', public: true, teamId: team.id }, { transaction });

        await transaction.commit();

        return {
          ok: true,
          team,
        };
      } catch (error) {
        console.log(error);

        await transaction.rollback();

        return {
          ok: false,
          errors: error.errors.map((x) => _.pick(x, ['path', 'message'])),
        };
      }
    }),
    addTeamMember: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      const { teamId, email } = args;

      try {
        const teamPromise = models.Team.findOne({ where: { id: teamId } }, { raw: true });
        const userToInvitePromise = models.User.findOne({ where: { email } }, { raw: true });

        const [team, userToInvite] = await Promise.all([teamPromise, userToInvitePromise]);

        console.log(team);
        console.log(userToInvite);
        console.log(teamId);

        if (!userToInvite) {
          return {
            ok: false,
            errors: [{
              path: 'email',
              message: `Uable to invite ${email}`,
            }],
          };
        }

        if (team.owner !== user.id) {
          return {
            ok: false,
            errors: [{
              path: 'email',
              message: 'You cannot add memebers to the team',
            }],
          };
        }

        const member = await models.Member.create({ userId: userToInvite.id, teamId });

        console.log(member);

        return {
          ok: true,
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
