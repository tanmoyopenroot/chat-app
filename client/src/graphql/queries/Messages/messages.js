import gql from 'graphql-tag';

const MESSAGES = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id,
      text,
      createdAt
    }
  }
`;

export default MESSAGES;
