import bcrypt from 'bcrypt';
import _ from 'lodash';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({
      where: { id },
    }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { password, ...othersArgs }, { models }) => {
      try {
        const hashedPassword = password
          ? await bcrypt.hash(password, 12)
          : '';
        const user = await models.User.create({ password: hashedPassword, ...othersArgs });

        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          errors: error.errors.map(x => _.pick(x, ['path', 'message'])),
        };
      }
    },
  },
};
