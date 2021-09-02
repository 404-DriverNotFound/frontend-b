import React from 'react';
import { Meta } from '@storybook/react';
import GameOptionCard from './GameOptionCard';

export default {
  title: 'molecules/GameOptionCard',
  component: GameOptionCard,
} as Meta;

export const Default = () => <GameOptionCard />;
