import { mergeResolvers } from 'merge-graphql-schemas';
import channelResolver from './channel';
import messageResolver from './message';
import teamResolver from './team';
import userResolver from './user';

export default mergeResolvers([
  channelResolver,
  messageResolver,
  teamResolver,
  userResolver,
]);
