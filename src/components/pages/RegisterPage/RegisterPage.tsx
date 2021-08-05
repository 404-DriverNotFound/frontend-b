/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import Input from '../../atoms/Input/Input';
import Typo from '../../atoms/Typo/Typo';
import Switch from '../../atoms/Switch/Switch';
import Button from '../../atoms/Button/Button';
import makeAPIPath from '../../../utils/utils';

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
  const [name, setName] = useState<string>('');
  const [isValidName, setNameValid] = useState<boolean>(false);
  const [isNameChecked, setNameChecked] = useState<boolean>(false);
  const [is2FAEnabled, set2FA] = useState<boolean>(false);
  const [filename, setFilename] = useState<string | null>(null);
  const classes = useStyles();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const split = event.target.value.split('\\');
    setFilename(split[split.length - 1]);
  };

  const handleNameChange = (event: React.ChangeEvent<Element>) => {
    const { value } = (event as React.ChangeEvent<HTMLInputElement>).target;
    if (value.length > 12) return;

    if (/^[A-Za-z0-9+]{3,12}$/.test(value)) setNameValid(true);
    else setNameValid(false);
    setName(value);
    setNameChecked(false);
  };

  const handleNameCheck = () => {
    axios.head(makeAPIPath(`/users/name/${name}`))
      .then(() => {
        // TODO: error 띄워주기
        setNameValid(false);
      })
      .catch((error) => {
        if (error.response) setNameChecked(true);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 유저 생성 (POST /users { name, avatar, enable2FA })
  };

  return (
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
        <form onSubmit={handleSubmit}>
          <Grid item container className={classes.margin} justifyContent="space-between">
            <Input onChange={handleNameChange} label="닉네임 *" value={name} helperText="영문+숫자 3-12자" error={!isValidName} />
            <Button onClick={handleNameCheck} disabled={!isValidName}>중복 체크</Button>
          </Grid>
          <Grid item container className={classes.margin} direction="column">
            <Grid item container justifyContent="space-between" alignItems="center">
              <Typo variant="subtitle1">프로필 사진 등록</Typo>
              <MaterialButton className={classes.button} variant="contained" color="primary" component="label">
                <Typo variant="button">파일 선택</Typo>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={handleFileSelect}
                  hidden
                />
              </MaterialButton>
            </Grid>
            <Typo variant="caption">{filename || '선택된 파일이 없습니다.'}</Typo>
          </Grid>
          <Grid item container className={classes.margin} justifyContent="space-between">
            <Typo variant="subtitle1">2 Factor 인증 사용 여부</Typo>
            <Switch checked={is2FAEnabled} onChange={() => { set2FA(!is2FAEnabled); }} />
          </Grid>
          <Grid item container justifyContent="center">
            <Button type="submit" disabled={!isNameChecked}>회원 가입</Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
