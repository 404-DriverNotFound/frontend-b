import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Input from '../../atoms/Input/Input';

const ChannelInfoForm = () => {
  const [channelName, setChannelName] = useState<string>('');
  const [isValidChannelName, setValidChannelName] = useState<boolean>(false);
  const [helperTextChannelName, setHelperTextChannelName] = useState<string>('영문+숫자 30자 이내');

  const [password, setPassword] = useState<string>('');
  const [isValidPassword, setValidPassword] = useState<boolean>(false);
  const [helperTextPassword, setHelperTextPassword] = useState<string>('영문+숫자 4-12자');

  const [checkPassword, setCheckPassword] = useState<string>('');
  const [isValidCheckPassword, setValidCheckPassword] = useState<boolean>(false);
  const [helperTextCheckPassword, setHelperTextCheckPassword] = useState<string>('영문+숫자 4-12자');

  const handleChannelNameChange = (event: React.ChangeEvent<Element>) => {
    const { value } = (event as React.ChangeEvent<HTMLInputElement>).target;
    if (value.length > 25) return;
    if (value.length > 0) {
      setValidChannelName(true);
      setHelperTextChannelName('사용할 수 있는 채널이름');
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

  return (
    <Grid flex-direction="column" alignItems="center">
      <Grid>
        <Input
          onChange={handleChannelNameChange}
          label="채널명 입력 *"
          value={channelName}
          helperText={helperTextChannelName}
          error={!isValidChannelName}
        />
      </Grid>
      <Grid>
        <Input
          onChange={handlePasswordChange}
          label="비밀번호 입력 *"
          type="password"
          value={password}
          helperText={helperTextPassword}
          error={!isValidPassword}
        />
      </Grid>
      <Grid>
        <Input
          onChange={handleCheckPasswordChange}
          label="비밀번호 검증 입력 *"
          type="password"
          value={checkPassword}
          helperText={helperTextCheckPassword}
          error={!isValidCheckPassword}
        />
      </Grid>
    </Grid>
  );
};

export default ChannelInfoForm;
