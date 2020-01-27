import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  Form,
  Input,
  Button,
} from 'semantic-ui-react';
import { CREATE_MESSAGE } from '../../graphql/mutations/Message/createMessage';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { channelId } = useParams();
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const onButtonClick = async () => {
    try {
      const response = await createMessage({
        variables: {
          text: message,
          channelId: parseInt(channelId, 10),
        },
      });

      console.log(response);
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };

  return (
    <Form>
      <Form.Field required>
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
        />
      </Form.Field>
      <Button onClick={onButtonClick}>Submit</Button>
    </Form>
  );
};

export default MessageForm;
