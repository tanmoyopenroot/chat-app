import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  Button,
  Header,
  Modal,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';

const CREATE_CHANNEL = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok,
      channel {
        id,
      }
      errors {
        path,
        message
      }
    }
  }
`;

const CreateChannel = (props) => {
  const { open, onClose, onCreate } = props;
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { teamId } = useParams();
  const [createChannel] = useMutation(CREATE_CHANNEL);

  const onButtonClick = async () => {
    setErrors({});

    try {
      const response = await createChannel({
        variables: {
          name,
          teamId: parseInt(teamId, 10),
        },
      });

      console.log(response);

      const { ok, errors: responseErrors, channel } = response.data.createChannel;

      if (!ok) {
        const errObj = {};

        responseErrors.forEach((error) => {
          errObj[error.path] = error.message;
        });

        setErrors(errObj);
      } else {
        onClose();
        onCreate({
          name: channel.name,
          id: channel.id,
        });

        history.push(`/teams/${teamId}/${channel.id}`);
      }
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Modal.Header>
        Create a Channel
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>
            Default Profile Image
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
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Create"
          onClick={onButtonClick}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateChannel;
