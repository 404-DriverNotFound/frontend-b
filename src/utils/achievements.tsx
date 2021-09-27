/* eslint-disable no-unused-vars */
import React from 'react';
import SportsEsportsTwoToneIcon from '@material-ui/icons/SportsEsportsTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone';

export enum AchievementName {
  FIRST_GAME = 'FIRST_GAME',
  FIRST_WIN = 'FIRST_WIN',
  FIRST_LOSE = 'FIRST_LOSE',
  FIRST_FRIEND = 'FIRST_FRIEND',
  FIRST_BLOCK = 'FIRST_BLOCK',
}

export enum AchievementDescription {
  FIRST_GAME = 'You have successfully played your first game.',
  FIRST_WIN = 'Congratulations on your first win.',
  FIRST_LOSE = 'You have achieved your first lose.',
  FIRST_FRIEND = 'You made your first friend.',
  FIRST_BLOCK = 'You made your first hater.',
}

export const ACHIEVEMENT_LIST = {
  [AchievementName.FIRST_GAME]: <SportsEsportsTwoToneIcon fontSize="large" />,
  [AchievementName.FIRST_WIN]: <ThumbUpTwoToneIcon fontSize="large" />,
  [AchievementName.FIRST_LOSE]: <ThumbDownTwoToneIcon fontSize="large" />,
  [AchievementName.FIRST_FRIEND]: <GroupAddTwoToneIcon fontSize="large" />,
  [AchievementName.FIRST_BLOCK]: <BlockTwoToneIcon fontSize="large" />,
};
