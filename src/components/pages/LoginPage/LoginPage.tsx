import React from 'react';
import { useAppDispatch } from '../../../utils/hooks/useContext';
import makeAPIPath from '../../../utils/utils';
import Button from '../../atoms/Button/Button';
import Typo from '../../atoms/Typo/Typo';
import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';

const LoginPage = () => {
  const appDispatch = useAppDispatch();
  const handleClick = () => {
    appDispatch({ type: 'loading' });
  };
  return (
    <LoginTemplate
      logo={
        <Typo variant="h1">PONG</Typo>
      }
      button={(
        <Button
          href={makeAPIPath('/auth/42')}
          onClick={handleClick}
        >
          로그인 / 회원가입
        </Button>
      )}
    />
  );
};

export default LoginPage;
