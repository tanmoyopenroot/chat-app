import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default CREATE_MESSAGE;
