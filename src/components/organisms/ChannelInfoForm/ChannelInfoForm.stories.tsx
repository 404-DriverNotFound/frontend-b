import React from 'react';
import { Meta } from '@storybook/react';
import ChannelInfoForm from './ChannelInfoForm';

export default {
  title: 'organisms/ChannelInfoForm',
  component: ChannelInfoForm,
} as Meta;

export const Default = () => (
  <ChannelInfoForm setOpen={() => {}} />
);
