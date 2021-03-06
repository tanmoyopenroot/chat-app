import _ from 'lodash';
import { tryLogin } from '../auth';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({
      where: { id },
    }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET }) => tryLogin(
      email,
      password,
      models,
      SECRET,
    ),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          errors: error.errors.map((x) => _.pick(x, ['path', 'message'])),
        };
      }
    },
  },
};
