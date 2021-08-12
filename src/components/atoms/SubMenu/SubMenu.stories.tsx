import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import SubMenu from './SubMenu';

export default {
  component: SubMenu,
  title: 'atoms/SubMenu',
} as Meta;

export const Default = () => (
  <BrowserRouter>
    <SubMenu />
  </BrowserRouter>
);
