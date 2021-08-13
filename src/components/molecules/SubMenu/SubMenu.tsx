import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '../../atoms/Button/Button';

const useStyles = makeStyles({
  width: {
    width: '17em',
  },
});

const ListArray = ['ALL Users', 'Friends List', 'Blocked User'];

const SubMenu = () => {
  const classes = useStyles();
  const Menus = ListArray.map((item) => (
    <NavLink
      key={item}
      to={`/Community/${item.toLowerCase()}`}
      style={{ textDecoration: 'none' }}
      activeStyle={{
        backgroundColor: '#dceeff',
        color: 'white',
        borderRadius: '5px',
      }}
    >
      <Button className={classes.width} variant="text">
        {item}
      </Button>
    </NavLink>
  ));

  return (
    <Grid
      item
      container
      justifyContent="center"
      spacing={1}
    >
      { Menus }
    </Grid>
  );
};

export default SubMenu;
