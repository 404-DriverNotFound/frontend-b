import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { asyncGetRequest, makeAPIPath } from '../../../utils/utils';
import List from '../../atoms/List/List';
import ListItem from '../../atoms/ListItem/ListItem';
import SubMenu from '../../molecules/SubMenu/SubMenu';
import Typo from '../../atoms/Typo/Typo';
import Button from '../../atoms/Button/Button';
import Dialog from '../../molecules/Dialog/Dialog';
import useDialog from '../../../utils/hooks/useDialog';
import useIntersect from '../../../utils/hooks/useIntersect';

const ALL_PATH = '/channel/all';
const JOINED_PATH = '/channel/joined';

const COUNTS_PER_PAGE = 10;

const useStyles = makeStyles({
  button: {
    width: '100%',
  },
});

type ListProps = {
  type: 'joined' | 'all',
};

const list = [
  { name: '참여 채널', link: JOINED_PATH },
  { name: '전체 채널', link: ALL_PATH },
];

const ChannelList = ({ type }: ListProps) => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const path = type === 'joined' ? makeAPIPath('/channels/me') : makeAPIPath('/channels');
  const [channels, setChannels] = useState([]);
  const [isListEnd, setListEnd] = useState(false);
  const [page, setPage] = useState<number>(1);
  const {
    // eslint-disable-next-line no-unused-vars
    isOpen, setOpen, dialog, setDialog, // FIXME: ListItem으로 내려주기
  } = useDialog();

  const fetchItems = () => {
    if (isListEnd) return;

    asyncGetRequest(`${path}?perPage=${COUNTS_PER_PAGE}&page=${page}`, source)
      .then(({ data }) => {
        const typed = data;
        setChannels((prev) => prev.concat(typed));
        if (data.length === 0 || data.length < COUNTS_PER_PAGE) setListEnd(true);
      })
      .catch((error) => {
        source.cancel();
        toast.error(error.message);
        setListEnd(true);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  // eslint-disable-next-line no-unused-vars
  const [_, setRef] = useIntersect(async (entry: any, observer: any) => {
    observer.unobserve(entry.target);
    await new Promise((resolve) => setTimeout(resolve, 250));
    setPage((prev) => prev + 1);
    observer.observe(entry.target);
  });

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      source.cancel();
      setChannels([]);
      setListEnd(true);
    };
  }, []);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={dialog.title}
        content={dialog.content}
        buttons={dialog.buttons}
        onClose={dialog.onClose}
      />
      {channels.map((channel: any) => (
        <ListItem key={channel.id}>
          <Typo>{channel.name}</Typo>
        </ListItem>
      ))}
      {!isListEnd && (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}
        ref={isListEnd ? null : setRef as React.LegacyRef<HTMLDivElement>}
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          wrap="nowrap"
          spacing={1}
          xs={12}
          // FIXME 스켈레톤
        >
          <ListItem>Put Skeleton Here</ListItem>
        </Grid>
      </div>
      )}
    </>
  );
};

const JoinedList = () => <ChannelList type="joined" />;
const AllList = () => <ChannelList type="all" />;

const ChannelPage = () => {
  const classes = useStyles();
  const { isOpen, setOpen } = useDialog();

  return (
    <>
      <Dialog
        isOpen={isOpen}
        content={<></>} // FIXME ChannelInfoForm 넣기
        onClose={() => setOpen(false)}
      />
      <Grid container>
        <Grid item container justifyContent="center" xs={10}>
          <SubMenu current={window.location.pathname} list={list} />
        </Grid>
        <Grid item container justifyContent="flex-end" xs={2}>
          <Button className={classes.button} variant="outlined" onClick={() => setOpen(true)}>채널 개설</Button>
        </Grid>
      </Grid>
      <List height="78vh" scroll>
        <Switch>
          <Route exact path={JOINED_PATH} component={JoinedList} />
          <Route exact path={ALL_PATH} component={AllList} />
          <Route path="/">
            <Redirect to={JOINED_PATH} />
          </Route>
        </Switch>
      </List>
    </>
  );
};

export default ChannelPage;
