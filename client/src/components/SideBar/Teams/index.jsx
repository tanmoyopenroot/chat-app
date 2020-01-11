import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {
  List,
  Dimmer,
  Loader,
  Card,
  Icon,
} from 'semantic-ui-react';
import CreateTeam from '../CreateTeam';
import ALL_TEAMS from '../../../graphql/queries/Team/allTeams';

const Teams = () => {
  const { loading, data, refetch } = useQuery(ALL_TEAMS);
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  return [
    <Card key="teams">
      <Card.Content>
        <Card.Header>Teams</Card.Header>
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
                <List.Item key="create-team-label">
                  <Icon
                    name="plus circle"
                    onClick={() => setShowCreateTeam(true)}
                  />
                </List.Item>
                {
                  data.allTeams.map(({ id, name }) => (
                    <List.Item key={id}>
                      <Link to={`/teams/${id}`}>
                        {name}
                      </Link>
                    </List.Item>
                  ))
                }
                {
                  data.invitedTeams.map(({ id, name }) => (
                    <List.Item key={id}>
                      <Link to={`/teams/${id}`}>
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
    <CreateTeam
      key="create-team"
      open={showCreateTeam}
      onClose={() => setShowCreateTeam(false)}
      onCreate={() => refetch()}
    />,
  ];
};

export default Teams;
