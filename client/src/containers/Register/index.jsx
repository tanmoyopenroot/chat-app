import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Header,
  Form,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';
import REGISTER_USER from '../../graphql/mutations/User/register';

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
      },
    });

    const { ok, errors: responseErrors } = response.data.register;

    if (!ok) {
      const errObj = {};

      responseErrors.forEach((error) => {
        errObj[error.path] = error.message;
      });

      setErrors(errObj);
    } else {
      history.push('/');
    }
  };

  return (
    <Container fluid text>
      <Header as="h2">
        Register
      </Header>
      <Form>
        <Form.Field error={!!errors.username}>
          <Input
            fluid
            icon="user"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <Input
            fluid
            icon="mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field error={!!errors.password}>
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
