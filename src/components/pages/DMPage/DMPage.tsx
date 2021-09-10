import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { asyncGetRequest, errorMessageHandler, makeAPIPath } from '../../../utils/utils';
import List from '../../atoms/List/List';
import Dialog from '../../molecules/Dialog/Dialog';
import useDialog from '../../../utils/hooks/useDialog';
import useIntersect from '../../../utils/hooks/useIntersect';
import { MemberType as DMRoomType } from '../../../types/Chat';
import ListItem from '../../atoms/ListItem/ListItem';
import { useAppDispatch } from '../../../utils/hooks/useAppContext';

const COUNTS_PER_PAGE = 10;

const DMPage = () => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const [dms, setDMs] = useState<DMRoomType[]>([]);
  const [isListEnd, setListEnd] = useState(false);
  const [page, setPage] = useState<number>(1);
  const {
    // eslint-disable-next-line no-unused-vars
    isOpen, setOpen, dialog, setDialog,
  } = useDialog();
  const path = makeAPIPath('/dmers');
  // eslint-disable-next-line no-unused-vars
  const appDispatch = useAppDispatch();

  const fetchItems = () => {
    if (isListEnd) return;

    asyncGetRequest(`${path}?perPage=${COUNTS_PER_PAGE}&page=${page}`, source)
      .then(({ data }) => {
        setDMs((prev) => prev.concat(data));
        if (data.length === 0 || data.length < COUNTS_PER_PAGE) setListEnd(true);
      })
      .catch((error) => {
        source.cancel();
        errorMessageHandler(error);
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

  useEffect(() => () => {
    source.cancel();
    setDMs([]);
    setListEnd(true);
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
      <List height="84vh" scroll>
        {dms.map((room: DMRoomType) => (
          // FIXME DMListItem으로 교체
          <ListItem key={room.id}>{room.name}</ListItem>
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
            // FIXME 스켈레톤 넣기
          >
            <ListItem>skeleton here</ListItem>
            <ListItem>skeleton here</ListItem>
            <ListItem>skeleton here</ListItem>
          </Grid>
        </div>
        )}
      </List>
    </>
  );
};

export default DMPage;
