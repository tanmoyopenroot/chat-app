import gql from 'graphql-tag';

const ALL_TEAMS = gql`
  {
    allTeams {
      id
      name
    }
    invitedTeams {
      id
      name
    }
  }
`;


export default ALL_TEAMS;
