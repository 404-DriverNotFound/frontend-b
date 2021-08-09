import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const StyledCard = withStyles({
  root: {
    width: '90vw',
    height: '50px',
  },
})(Card);

type ListItemProps = {
  children?: React.ReactNode,
};

const ListItem = ({ children }: ListItemProps) => (<StyledCard>{children}</StyledCard>);

ListItem.defaultProps = {
  children: null,
};

export default ListItem;
