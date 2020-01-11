import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation($username:String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok,
      errors {
        path,
        message
      }
    }
  }
`;

export default REGISTER_USER;
