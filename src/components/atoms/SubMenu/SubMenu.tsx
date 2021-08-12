import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';

const useStyles = makeStyles({
  width: {
    width: '250px',
  },
});

const ListArray = ['ALL Users', 'Friends List', 'Blocked User'];

const SubMenu = () => {
  const classes = useStyles();
  const Menus = ListArray.map((item) => (
    <NavLink
      to={`/Community/${item}`}
      style={{ textDecoration: 'none' }}
      activeStyle={{
        boxShadow: '2px 2px 2px rgba(0, 0, 255, .2)',
        backgroundColor: '#b3d3f1',
        outline: 'solid',
        outlineColor: '#1a77d2',
        outlineStyle: 'groove',
        outlineWidth: 'thin',
      }}
    >
      <Button className={classes.width} variant="text">
        {item}
      </Button>
    </NavLink>
  ));

  return (
    <ButtonGroup
      variant="text"
      color="primary"
    >
      { Menus }
    </ButtonGroup>
  );
};

export default SubMenu;
