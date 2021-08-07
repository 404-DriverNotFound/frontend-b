// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../atoms/Button/Button';
import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';
import { useAppDispatch } from '../../../utils/hooks/useContext';
import makeAPIPath from '../../../utils/utils';

const MFARegisterPage = () => {
  const [QRImageSrc, setQRSrc] = useState<string>('');
  const appDispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    appDispatch({ type: 'loading' });

    fetch(makeAPIPath('/auth/otp/qrcode'), { credentials: 'include' })
      .finally(() => { appDispatch({ type: 'endLoading' }); })
      .then((response) => response.blob())
      .then((blob) => setQRSrc(URL.createObjectURL(blob)))
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleClick = () => {
    // TODO: QR 정상 등록했는지 아닌지 확인해줘야 하지 않나?
    history.push('/');
  };

  return (
    <LoginTemplate
      input={<img alt="QR Code" src={QRImageSrc} />}
      button={<Button onClick={handleClick}>2FA 등록</Button>}
    />
  );
};

export default MFARegisterPage;
