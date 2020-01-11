import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok,
      token,
      refreshToken,
      errors {
        path,
        message,
      }
    }
  }
`;

export default LOGIN_USER;
