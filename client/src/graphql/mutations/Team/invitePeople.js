import gql from 'graphql-tag';

export const ADD_TEAM_MEMEBER = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default ADD_TEAM_MEMEBER;
