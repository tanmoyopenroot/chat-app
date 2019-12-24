import express from 'express';
// import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
// import { mergeSchemas } from 'graphql-tools';

// import typeDefs from './schema';
import typeDefs from './schemas';
import resolvers from './resolvers';
import models from './models';

const PORT = 8080;
const app = express();

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    models,
    user: {
      id: 1,
    },
  }),
});
server.applyMiddleware({ app });

models.sequelize
  .sync()
  .then(() => {
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
    console.log('Database error:', error);
  });

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// app.listen(PORT);
