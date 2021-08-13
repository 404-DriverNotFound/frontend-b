import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '../../atoms/Button/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'inherited',
  },
  active: {
    backgroundColor: '#dceeff',
  },
});

const ListArray = ['All Users', 'Friends List', 'Blocked User'];

const SubMenu = () => {
  const url = window.location.pathname;
  const history = useHistory();
  const classes = useStyles();
  const Menus = ListArray.map((item) => {
    if (url === '/community/{item}') {
      return (
        <Button
          key={item}
          className={classes.active}
          variant="text"
          onClick={() => { history.push(`/community/${item.toLowerCase()}`); }}
        >
          {item}
        </Button>
      );
    }
    return (
      <Button
        key={item}
        className={classes.root}
        variant="text"
        onClick={() => { history.push(`/community/${item.toLowerCase()}`); }}
      >
        {item}
      </Button>
    );
  });
  return (
    <ButtonGroup
      variant="text"
      color="primary"
      aria-label="subMenu"
      fullWidth
    >
      { Menus }
    </ButtonGroup>
  );
};

export default SubMenu;
