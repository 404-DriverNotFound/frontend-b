/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import Typo from '../../atoms/Typo/Typo';

const Menu = () => {
  const Choices = ['Game', 'DM', 'Channel', 'Community', 'Profile', 'Logout'];
  const RenderChoices = Choices.map((item) => (
    <Grid item key={item}>
      <NavLink
        activeStyle={{
          color: 'yellow',
        }}
        style={{ textDecoration: 'none', color: 'inherit' }}
        to={`/${item.toLowerCase()}`}
      >
        <Typo variant="h6">{item}</Typo>
      </NavLink>
    </Grid>
  ));

  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Typo variant="h5">
            🏓 Pong Mighty
          </Typo>
        </Grid>
        <Grid container spacing={3} justifyContent="flex-end">
          {RenderChoices}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
