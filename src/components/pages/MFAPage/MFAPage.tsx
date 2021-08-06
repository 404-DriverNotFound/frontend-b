import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useUserDispatch } from '../../../utils/hooks/useContext';
import makeAPIPath from '../../../utils/utils';
import Button from '../../atoms/Button/Button';
import DigitInput from '../../atoms/DigitInput/DigitInput';
import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';

type digitString = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '';

const usePrevious = (value: digitString[]) => {
  const ref = useRef<digitString[]>(['', '', '', '', '', '']);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const MFAPage = () => {
  const [inputs, setInputs] = useState<digitString[]>(['', '', '', '', '', '']);
  const refs = inputs.map(() => useRef<HTMLInputElement | HTMLTextAreaElement>(null));
  const appDispatch = useAppDispatch();
  const userDispatch = useUserDispatch();
  const history = useHistory();
  const prevInputs = usePrevious(inputs);

  useEffect(() => {
    let idx = 0;
    for (let i = 0; i < 6; i += 1) {
      if (inputs[i] !== prevInputs[i]) {
        idx = i;
        break;
      }
    }
    if (idx !== 5 && inputs[idx] !== '') refs[idx + 1].current?.focus();
    else if (idx === 0) refs[0].current?.focus();
  }, [inputs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (value === '' || /^[0-9]$/.test(value)) {
      const index = Number(name);
      const renew: digitString[] = inputs.map((input: digitString, idx): digitString => (
        idx === index ? value as digitString : input
      ));
      setInputs(renew);
    }
  };

  const Inputs = inputs.map((input, idx) => (
    <DigitInput
      key={`digit${String(idx)}`}
      onChange={handleChange}
      name={String(idx)}
      value={input}
      ref={refs[idx]}
    />
  ));

  const handleClick = () => {
    appDispatch({ type: 'loading' });
    axios.post(makeAPIPath('/auth/otp'), { token: inputs.join('') })
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then((response) => {
        const { id, name, avatar } = response.data;
        userDispatch({ type: 'login', info: { id, name, avatar } });
        history.push('/');
      })
      .catch((error) => {
        if (error.response) toast.error('인증 번호가 잘못되었습니다.');
        else toast.error(error.message);
      });
  };

  return (
    <LoginTemplate
      input={Inputs}
      button={<Button onClick={handleClick}>2FA 인증</Button>}
    />
  );
};

export default MFAPage;
