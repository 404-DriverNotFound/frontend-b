import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Input from '../../atoms/Input/Input';
import Switch from '../../atoms/Switch/Switch';
import Typo from '../../atoms/Typo/Typo';
import Button from '../../atoms/Button/Button';

const useStyles = makeStyles({
  root: {
    padding: '5em 0',
    width: '300px',
  },
  margin: {
    marginBottom: '1em',
  },
  button: {
    marginTop: '1.68em',
    width: '32.8%',
  },
});

// eslint-disable-next-line no-unused-vars
type ChannelInfoFormProps = { setOpen: (isOpen:boolean) => void };

const ChannelInfoForm = ({ setOpen }: ChannelInfoFormProps) => {
  const [channelName, setChannelName] = useState<string>('');
  const [isValidChannelName, setValidChannelName] = useState<boolean>(false);
  const [helperTextChannelName, setHelperTextChannelName] = useState<string>('영문+숫자 5-25자');
  const [isToggleChecked, setToggleCheck] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [isValidPassword, setValidPassword] = useState<boolean>(false);
  const [helperTextPassword, setHelperTextPassword] = useState<string>('영문+숫자 4-12자');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [isValidCheckPassword, setValidCheckPassword] = useState<boolean>(false);
  const [helperTextCheckPassword, setHelperTextCheckPassword] = useState<string>('영문+숫자 4-12자');
  const classes = useStyles();

  const handleChannelNameChange = (event: React.ChangeEvent<Element>) => {
    const { value } = (event as React.ChangeEvent<HTMLInputElement>).target;
    if (value.length > 25) return;
    if (/^[A-Za-z0-9]{5,25}$/.test(value)) {
      setValidChannelName(true);
      setHelperTextChannelName('사용할 수 있는 채널이름');
    } else {
      setValidChannelName(false);
      setHelperTextChannelName('영문+숫자 5-25자');
    }
    setChannelName(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<Element>) => {
    const { value } = (event as React.ChangeEvent<HTMLInputElement>).target;
    if (value.length > 12) return;
    if (/^[A-Za-z0-9]{4,12}$/.test(value)) {
      setValidPassword(true);
      setHelperTextPassword('사용할 수 있는 비밀번호');
    } else setValidPassword(false);
    if (checkPassword === value) {
      setValidCheckPassword(true);
      setHelperTextCheckPassword('비밀번호 일치');
    } else {
      setValidCheckPassword(false);
      setHelperTextCheckPassword('비밀번호 일치하지 않음');
    }
    setPassword(value);
  };

  const handleCheckPasswordChange = (event: React.ChangeEvent<Element>) => {
    const { value } = (event as React.ChangeEvent<HTMLInputElement>).target;
    if (value.length > 12) return;
    if (value === password) {
      setValidCheckPassword(true);
      setHelperTextCheckPassword('비밀번호 일치');
    } else {
      setValidCheckPassword(false);
      setHelperTextCheckPassword('비밀번호 일치하지 않음');
    }
    setCheckPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // FIXME: API 확정된 후 추가하기
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
        <Typo variant="h3" align="center" gutterBottom>Channel Form</Typo>
        <Typo className={classes.margin}>* 표시: 필수 입력 항목</Typo>
        <form onSubmit={handleSubmit}>
          <Grid item container alignItems="center" justifyContent="center">
            <Input
              onChange={handleChannelNameChange}
              label="채널명 입력 *"
              value={channelName}
              helperText={helperTextChannelName}
              error={!isValidChannelName}
            />
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <Switch
              name="private toggle"
              checked={isToggleChecked}
              onChange={() => { setToggleCheck(!isToggleChecked); }}
            />
            <Typo>Private</Typo>
          </Grid>
          <Grid>
            {isToggleChecked && (
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Input
                    onChange={handlePasswordChange}
                    label="비밀번호 입력 *"
                    type="password"
                    value={password}
                    helperText={helperTextPassword}
                    error={!isValidPassword}
                    autoComplete
                  />
                </Grid>
                <Grid item>
                  <Input
                    onChange={handleCheckPasswordChange}
                    label="비밀번호 검증 입력 *"
                    type="password"
                    value={checkPassword}
                    helperText={helperTextCheckPassword}
                    error={!isValidCheckPassword}
                    autoComplete
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid container justifyContent="center">
            <Button
              variant="text"
              className={classes.button}
              onClick={() => { setOpen(false); }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={(!isToggleChecked && !isValidChannelName)
                || (isToggleChecked && (!isValidPassword || !isValidCheckPassword
                  || !isValidChannelName))}
              className={classes.button}
            >
              채널 만들기
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChannelInfoForm;
