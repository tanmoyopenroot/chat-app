import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  List,
  Dimmer,
  Loader,
  Card,
  Icon,
} from 'semantic-ui-react';
import CreateChannel from '../CreateChannel';
import InvitePeople from '../InvitePeople';
import CHANNEL_BY_TEAM from '../../../graphql/queries/channels/channelsByTeam';

const Channels = () => {
  const { teamId } = useParams();
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showInvitePeople, setShowInvitePeople] = useState(false);
  const {
    loading,
    data,
    refetch,
  } = useQuery(CHANNEL_BY_TEAM, {
    variables: { teamId: parseInt(teamId, 10) },
    skip: !teamId,
  });


  return [
    <Card key="channels">
      <Card.Content>
        <Card.Header>
          Channels
          <Icon
            name="plus circle"
            onClick={() => setShowCreateChannel(true)}
          />
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
                  data.channelsByTeam.map(({ id, name }) => (
                    <List.Item key={id}>
                      <Link to={`/teams/${teamId}/${id}`}>
                        {name}
                      </Link>
                    </List.Item>
                  ))
                }
              </List>
            )
        }
      </Card.Content>
    </Card>,
    <CreateChannel
      key="create-channel"
      open={showCreateChannel}
      onClose={() => setShowCreateChannel(false)}
      onCreate={() => refetch()}
    />,
    <div key="invite-people-label">
      Invite people
      <Icon
        name="plus circle"
        onClick={() => setShowInvitePeople(true)}
      />
    </div>,
    <InvitePeople
      key="invite-people"
      open={showInvitePeople}
      onClose={() => setShowInvitePeople(false)}
    />,
  ];
};

export default Channels;
