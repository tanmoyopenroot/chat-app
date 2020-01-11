import gql from 'graphql-tag';

export const CREATE_CHANNEL = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok,
      channel {
        id,
      }
      errors {
        path,
        message
      }
    }
  }
`;

export default CREATE_CHANNEL;
