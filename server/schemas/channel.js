import { gql } from 'apollo-server-express';

export default gql`
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
  }

  type CreateChannelResponse {
    ok: Boolean!
    channel: Channel!
    errors: [Error!]
  }

  type Query {
    channelsByTeam(teamId: Int!): [Channel!]!
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean = false): CreateChannelResponse!
  }
`;
