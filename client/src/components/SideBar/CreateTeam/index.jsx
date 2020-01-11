import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Modal,
  Button,
  Message,
} from 'semantic-ui-react';
import CREATE_TEAM from '../../../graphql/mutations/Team/createTeam';

const CreateTeam = (props) => {
  const { open, onClose, onCreate } = props;
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
        onCreate();
        onClose();

        history.push(`/teams/${team.id}`);
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
        Create Team
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
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

export default CreateTeam;
