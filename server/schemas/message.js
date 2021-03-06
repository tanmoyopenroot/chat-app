import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    id: Int!
    text: String!
    createdAt: String!
  }

  type Query {
    messages(channelId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
