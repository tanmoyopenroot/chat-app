import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {
  List,
  Dimmer,
  Loader,
  Card,
} from 'semantic-ui-react';

const ALL_TEAMS = gql`
  {
    allTeams {
      id
      name
    }
  }
`;

const Teams = () => {
  const { loading, data } = useQuery(ALL_TEAMS);

  return (
    <Card>
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
                {
                  data.allTeams.map(({ id, name }) => (
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
    </Card>
  );
};

export default Teams;
