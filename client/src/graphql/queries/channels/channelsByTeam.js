import gql from 'graphql-tag';

const CHANNEL_BY_TEAM = gql`
  query($teamId: Int!) {
    channelsByTeam(teamId: $teamId) {
      id,
      name
    }
  }
`;

export default CHANNEL_BY_TEAM;
