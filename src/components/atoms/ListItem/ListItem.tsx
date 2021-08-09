import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme: Theme) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  createStyles({
    root: {
      padding: theme.spacing(1, 1, 1, 1),
    },
  }));

type ListItemProps = {
  children?: React.ReactNode,
};

const ListItem = ({ children }: ListItemProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>{children}</Card>
  );
};

ListItem.defaultProps = {
  children: null,
};

export default ListItem;
