import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  Form,
  Modal,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';
import { ADD_TEAM_MEMEBER } from '../../../graphql/mutations/Team/invitePeople';

const InvitePeople = (props) => {
  const { open, onClose } = props;
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { teamId } = useParams();
  const [addTeamMember] = useMutation(ADD_TEAM_MEMEBER);

  const onButtonClick = async () => {
    setErrors({});

    try {
      const response = await addTeamMember({
        variables: {
          email,
          teamId: parseInt(teamId, 10),
        },
      });

      console.log(response);

      const { ok, errors: responseErrors } = response.data.addTeamMember;

      if (!ok) {
        const errObj = {};

        responseErrors.forEach((error) => {
          errObj[error.path] = error.message;
        });

        setErrors(errObj);
      } else {
        onClose();
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
        Invite People
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field error={!!errors.email}>
              <Input
                fluid
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
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

export default InvitePeople;
