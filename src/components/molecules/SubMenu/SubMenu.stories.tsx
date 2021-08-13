import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import SubMenu from './SubMenu';
import { ContextProvider } from '../../../utils/hooks/useContext';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import List from '../../atoms/List/List';
import { FriendList, OneChat } from '../../atoms/ListItem/LitsItem.stories';

export default {
  component: SubMenu,
  title: 'molecules/SubMenu',
} as Meta;

export const Default = () => (
  <BrowserRouter>
    <ContextProvider>
      <SubMenu />
    </ContextProvider>
  </BrowserRouter>
);

export const InMainTemplate = () => (
  <BrowserRouter>
    <ContextProvider>
      <MainTemplate
        main={(
          <Grid container flex-direction="column">
            <Grid item container justifyContent="center">
              <SubMenu />
            </Grid>
            <Grid item container>
              <List height="80vh">
                <FriendList />
                <FriendList />
                <FriendList />
              </List>
            </Grid>
          </Grid>
      )}
        chat={(
          <List height="80vh" scroll>
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
            <OneChat />
          </List>
      )}
      />
    </ContextProvider>
  </BrowserRouter>
);
