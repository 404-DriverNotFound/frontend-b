import React from 'react';
import { Meta } from '@storybook/react';
import ListItem from './ListItem';

export default {
  component: ListItem,
  title: 'atoms/ListItem',
} as Meta;

export const Default = () => (
  <ListItem>
    jikang : Hi everyone!
    <br />
    hyochoi: hello everyone!
    <br />
    ykoh: nice to meet you!
  </ListItem>
);
