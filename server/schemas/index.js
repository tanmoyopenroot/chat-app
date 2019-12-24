import { mergeTypes } from 'merge-graphql-schemas';
import channelSchema from './channel';
import messageSchema from './message';
import teamSchema from './team';
import userSchema from './user';
import errorSchema from './error';

export default mergeTypes(
  [
    channelSchema,
    messageSchema,
    teamSchema,
    userSchema,
    errorSchema,
  ],
  { all: true },
);
