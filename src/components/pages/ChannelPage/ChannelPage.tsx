import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeAPIPath } from '../../../utils/utils';
import List from '../../atoms/List/List';
import ListItem from '../../atoms/ListItem/ListItem';
import SubMenu from '../../molecules/SubMenu/SubMenu';
import Typo from '../../atoms/Typo/Typo';
import Button from '../../atoms/Button/Button';

const ALL_PATH = '/channel/all';
const JOINED_PATH = '/channel/joined';

const useStyles = makeStyles({
  button: {
    width: '100%',
  },
});

type ListProps = {
  API: string,
};

const list = [
  { name: '참여 채널', link: JOINED_PATH },
  { name: '전체 채널', link: ALL_PATH },
];

const ChannelList = ({ API }: ListProps) => {
  const [channels, setChannels] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(makeAPIPath(API))
      .finally(() => {
        setLoading(false);
      })
      .then(() => {
        // FIXME: API 확정되면 맞춰서 고치기
      })
      .catch((error) => {
        setChannels([]);
        toast.error(error.message);
      });
  }, [API]);

  // FIXME: 로딩중 skeleton으로 고치기
  return (
    <>
      {(isLoading ? (
        <>
          <ListItem>loading</ListItem>
        </>
      ) : (
        channels.map((user) => (
          <ListItem key={user}>
            <Typo>{String(user)}</Typo>
          </ListItem>
        ))
      ))}
    </>
  );
};

const ChannelPage = () => {
  const classes = useStyles();

  // FIXME: API 확정되면 Route부분 API path 고치기
  return (
    <>
      <Grid container xs={12}>
        <Grid item container justifyContent="center" xs={10}>
          <SubMenu current={window.location.pathname} list={list} />
        </Grid>
        <Grid item container justifyContent="flex-end" xs={2}>
          <Button className={classes.button} variant="outlined">채널 개설</Button>
        </Grid>
      </Grid>
      <List height="78vh" scroll>
        <Switch>
          <Route exact path={JOINED_PATH} render={() => <ChannelList API="/users/channels" />} />
          <Route exact path={ALL_PATH} render={() => <ChannelList API="/channels" />} />
          <Route path="/">
            <Redirect to={JOINED_PATH} />
          </Route>
        </Switch>
      </List>
    </>
  );
};

export default ChannelPage;
