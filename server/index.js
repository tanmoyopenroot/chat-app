import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { refreshTokens } from './auth';
import typeDefs from './schemas';
import resolvers from './resolvers';
import models from './models';

const SECRET = 'SECRET';
const PORT = 8080;
const app = express();

const validateToken = async (token, refreshToken) => {
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      return {
        user,
      };
    } catch (err) {
      const {
        user,
        token: newToken,
        refreshToken: newRefreshToken,
      } = await refreshTokens(token, refreshToken, models, SECRET);

      return {
        user,
        token: newToken,
        refreshToken: newRefreshToken,
      };
    }
  }

  return {};
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const token = req.headers['x-token'] || '';
    const refreshToken = req.headers['x-refresh-token'] || '';

    const {
      user,
      token: newToken,
      refreshToken: newRefreshToken,
    } = await validateToken(token, refreshToken);

    if (newToken && newRefreshToken) {
      res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
      res.set('x-token', newToken);
      res.set('x-refresh-token', newRefreshToken);
    }

    return {
      models,
      user,
      SECRET,
    };
  },
});
server.applyMiddleware({ app });

models.sequelize
  .sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected');
    app.listen(
      { port: PORT },
      // eslint-disable-next-line no-console
      () => console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
      ),
    );
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Database error:', error);
  });
