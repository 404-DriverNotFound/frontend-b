import React from 'react';
import { Meta } from '@storybook/react';
import MFARegisterPage from './MFARegisterPage';

export default {
  component: MFARegisterPage,
  title: 'pages/MFARegisterPage',
} as Meta;

export const Login = () => (
  <MFARegisterPage />
);
