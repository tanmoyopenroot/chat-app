import { AuthenticationError } from 'apollo-server-express';

const createResolver = (resolver) => {
  const baseResolver = resolver;

  baseResolver.createResolver = (childResolver) => {
    const combine = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };

    return createResolver(combine);
  };

  return baseResolver;
};

export const requiresAuth = createResolver((parent, args, { user }) => {
  if (!user || !user.id) {
    throw new AuthenticationError('You must be logged in');
  }
});

export default requiresAuth;
