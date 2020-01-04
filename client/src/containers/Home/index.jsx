import React from 'react';
import { Grid } from 'semantic-ui-react';

import SideBar from '../../components/SideBar';

export default () => {
  return (
    <Grid>
      <Grid.Column width={4}>
        <SideBar />
      </Grid.Column>
      <Grid.Column width={9}>
        Test
      </Grid.Column>
      <Grid.Column width={3}>
        Test
      </Grid.Column>
    </Grid>
  );
};
