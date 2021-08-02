/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Switch from './Switch';

export default {
  title: 'atoms/Switch',
  component: Switch,
} as Meta;

export const Default = () => {
  const [bool, setBool] = useState(false);
  const handleChange = () => {
    if (bool === false) return setBool(true);
    return setBool(false);
  };
  return (
    <>
      <Switch
        checked={bool}
        onChange={handleChange}
        name="2FAswitch"
      />
    </>
  );
};
