import React from 'react';
import LooksOneTwoToneIcon from '@material-ui/icons/LooksOneTwoTone';
import TimerTwoToneIcon from '@material-ui/icons/TimerTwoTone';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

export type RawAchievementType = {
  icon: React.ReactNode,
  description: string,
}; // FIXME 임시 type

export type AchievementType = {
  icon: React.ReactNode,
  description: string,
  date: Date,
}; // FIXME 임시 type

export const achievementList: RawAchievementType[] = [
  {
    icon: <LooksOneTwoToneIcon fontSize="large" />,
    description: '첫 승리',
  },
  {
    icon: <TimerTwoToneIcon fontSize="large" />,
    description: '10초만에 승리',
  },
  {
    icon: <TrendingUpIcon fontSize="large" />,
    description: '10회 연속 승리',
  },
];
