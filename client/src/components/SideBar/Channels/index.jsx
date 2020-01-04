import React, { useState } from 'react';
import gql from 'graphql-tag';
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

const CHANNEL_BY_TEAM = gql`
  query($teamId: Int!) {
    channelsByTeam(teamId: $teamId) {
      id,
      name
    }
  }
`;

const Channels = () => {
  const { teamId } = useParams();
  const [showCreateChannel, setShowCreateChannel] = useState(false);
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
  ];
};

export default Channels;
