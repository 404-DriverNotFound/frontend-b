import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AchieveListItem from './AchieveListItem';
import List from '../../atoms/List/List';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { ContextProvider } from '../../../utils/hooks/useContext';
import { achievementList, AchievementType } from '../../../utils/achievements';

export default {
  title: 'organisms/AchieveListItem',
  component: AchieveListItem,
} as Meta;

const dummyAchieveList: AchievementType[] = achievementList
  .map((achievement) => ({ ...achievement, date: new Date() }));

export const Default = () => (
  <AchieveListItem type={dummyAchieveList[0]} />
);

export const WithList = () => (
  <List scroll height="15em">
    {dummyAchieveList.map((achievement) => <AchieveListItem type={achievement} />)}
  </List>
);

export const WithTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={<WithList />}
        chat={<h1>Chat</h1>}
      />
    </ContextProvider>
  </BrowserRouter>
);
