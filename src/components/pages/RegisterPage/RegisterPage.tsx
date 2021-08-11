import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typo from '../../atoms/Typo/Typo';
import Button from '../../atoms/Button/Button';
import Dialog from '../../molecules/Dialog/Dialog';
import UserInfoForm from '../../organisms/UserInfoForm/UserInfoForm';

const useStyles = makeStyles({
  root: {
    padding: '5em 0',
    width: '350px',
  },
  margin: {
    marginBottom: '1em',
  },
  button: {
    margin: '0.25em',
  },
});

const RegisterPage = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title="회원가입 완료"
        content="회원가입이 완료되어 로그인 화면으로 돌아갑니다. 서비스를 이용하시려면 로그인 해주세요."
        buttons={<Button variant="text" onClick={() => { history.push('/'); }}>확인</Button>}
        onClose={() => { history.push('/'); }}
      />
      <Grid container justifyContent="center">
        <Grid
          item
          container
          className={classes.root}
          direction="column"
          justifyContent="space-evenly"
          spacing={3}
        >
          <Typo variant="h3" align="center" gutterBottom>Register Form</Typo>
          <Typo>* 표시: 필수 입력 항목</Typo>
          <UserInfoForm
            currentName=""
            currentAvatarSrc=""
            current2FA={false}
            setDialogOpen={setOpen}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
