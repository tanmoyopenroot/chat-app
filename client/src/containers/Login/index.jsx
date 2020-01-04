import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';

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

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [loginUser] = useMutation(LOGIN_USER);

  const onButtonClick = async () => {
    setErrors({});

    const response = await loginUser({
      variables: {
        email,
        password,
      },
    });

    const { ok, errors: responseErrors } = response.data.login;

    if (!ok) {
      const errObj = {};

      responseErrors.forEach((error) => {
        errObj[error.path] = error.message;
      });

      setErrors(errObj);
    } else {
      const { token, refreshToken } = response.data.login;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    }
  };

  return (
    <Container fluid text>
      <Header as="h2">
        Login
      </Header>
      <Form>
        <Form.Field error={!!errors.login}>
          <Input
            fluid
            icon="mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field error={!!errors.login}>
          <Input
            fluid
            icon="key"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </Form.Field>
        <Button onClick={onButtonClick}>
          Submit
        </Button>
      </Form>
      {
        !!Object.keys(errors).length && (
          <Message
            error
            header="There was some errors with your submission"
            list={Object.values(errors)}
          />
        )
      }
    </Container>
  );
};
