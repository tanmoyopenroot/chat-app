import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { useHistory } from'react-router-dom';
import {
  Container,
  Header,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';

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

export default () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [registerUser] = useMutation(REGISTER_USER);

  const onButtonClick = async () => {
    setErrors({});

    const response = await registerUser({
      variables: {
        username,
        email,
        password,
      }
    });

    const { ok, errors } = response.data.register;

    if (!ok) {
      const errObj = {};

      errors.forEach(error => {
        errObj[error.path] = error.message
      });

      setErrors(errObj);
    } else {
      history.push('/');
    }
  };

  return (
    <Container fluid text>
      <Header as='h2'>
        Register
      </Header>
      <Input
        fluid
        icon='user'
        type='text'
        error={!!errors.username}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder='Username'
      />
      <Input
        fluid
        icon='mail'
        type='email'
        error={!!errors.email}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder='Email'
      />
      <Input
        fluid
        icon='key'
        type='password'
        error={!!errors.password}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder='Password'
      />
      <Button onClick={onButtonClick}>
        Submit
      </Button>
      {
        !!Object.keys(errors).length && (
          <Message
            error
            header='There was some errors with your submission'
            list={Object.values(errors)}
          />
        )
      }
    </Container>
  )
}
