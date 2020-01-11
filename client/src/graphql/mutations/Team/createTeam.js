import gql from 'graphql-tag';

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok,
      team {
        id,
      }
      errors {
        path,
        message
      }
    }
  }
`;


export default CREATE_TEAM;
