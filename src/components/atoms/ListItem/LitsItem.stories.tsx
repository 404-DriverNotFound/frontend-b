import React from 'react';
import { Meta } from '@storybook/react';
import Grid from '@material-ui/core/Grid';
import ListItem from './ListItem';
import Typo from '../Typo/Typo';

export default {
  component: ListItem,
  title: 'atoms/ListItem',
} as Meta;

export const Default = () => (
  <>
    <ListItem>
      <Grid>
        <Typo>
          Jikang : Hi everyone!
        </Typo>
      </Grid>
      <Grid>
        <Typo>
          Hyochoi: hello everyone!
        </Typo>
      </Grid>
      <Grid>
        <Typo>
          Ykoh: nice to meet you!
        </Typo>
      </Grid>
    </ListItem>
  </>
);
