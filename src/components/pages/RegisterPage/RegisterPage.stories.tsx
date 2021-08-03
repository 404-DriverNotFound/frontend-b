import React from 'react';
import { Meta } from '@storybook/react';
import RegisterPage from './RegisterPage';

export default {
  component: RegisterPage,
  title: 'pages/RegisterPage',
} as Meta;

export const Register = () => (
  <RegisterPage />
);
