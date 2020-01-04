import React from 'react';
import { Grid } from 'semantic-ui-react';
import Teams from './Teams';
import Channels from './Channels';

const Sidebar = () => (
  <Grid>
    <Grid.Column width={8}>
      <Teams />
    </Grid.Column>
    <Grid.Column width={8}>
      <Channels />
    </Grid.Column>
  </Grid>
);

export default Sidebar;
