import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import {
  List,
  Dimmer,
  Loader,
  Card,
} from 'semantic-ui-react';
import MESSAGES from '../../graphql/queries/Messages/messages';

const MessageList = () => {
  const { channelId } = useParams();
  const {
    loading,
    data,
  } = useQuery(MESSAGES, {
    variables: { channelId: parseInt(channelId, 10) },
    skip: !channelId,
  });

  return (
    <Card key="channels">
      <Card.Content>
        <Card.Header>
          Messages
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {
          loading
            ? (
              <Dimmer active inverted>
                <Loader inverted content="Loading" />
              </Dimmer>
            ) : (
              <List>
                {
                  data.messages.map(({ id, text }) => (
                    <List.Item key={id}>
                      {text}
                    </List.Item>
                  ))
                }
              </List>
            )
        }
      </Card.Content>
    </Card>
  );
};

export default MessageList;
