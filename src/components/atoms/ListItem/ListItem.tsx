import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  createStyles({
    root: {
      padding: theme.spacing(1, 1, 1, 1),
    },
  }));

type ListItemProps = {
  children: React.ReactNode,
};

const ListItem = ({ children }: ListItemProps) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.root}>{children}</Card>
    </Grid>
  );
};

export default ListItem;
