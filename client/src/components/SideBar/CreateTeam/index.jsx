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

export default () => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [createTeam] = useMutation(CREATE_TEAM);

  const onButtonClick = async () => {
    setErrors({});

    try {
      const response = await createTeam({
        variables: {
          name,
        },
      });

      console.log(response);

      const { ok, errors: responseErrors, team } = response.data.createTeam;

      if (!ok) {
        const errObj = {};

        responseErrors.forEach((error) => {
          errObj[error.path] = error.message;
        });

        setErrors(errObj);
      } else {
        history.push(`/teams/${team.id}`);
      }
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };

  return (
    <Container fluid text>
      <Header as="h2">
        Create Team
      </Header>
      <Form>
        <Form.Field error={!!errors.login}>
          <Input
            fluid
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Team Name"
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
