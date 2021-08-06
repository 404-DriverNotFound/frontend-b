import React from 'react';
import { Meta } from '@storybook/react';
import MFAPage from './MFAPage';

export default {
  component: MFAPage,
  title: 'pages/MFAPage',
} as Meta;

export const Login = () => (
  <MFAPage />
);
