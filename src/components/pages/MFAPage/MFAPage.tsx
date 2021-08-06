import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../atoms/Button/Button';
import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';
import { useAppDispatch } from '../../../utils/hooks/useContext';
import makeAPIPath from '../../../utils/utils';

const MFAPage = () => {
  const [QRCode, setQRCode] = useState<Blob>();
  const [QRImageSrc, setQRSrc] = useState<string>('');
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch({ type: 'loading' });
    axios.get(makeAPIPath('/auth/otp/qrcode'))
      .finally(() => {
        appDispatch({ type: 'endLoading' });
      })
      .then((response) => {
        setQRCode(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (!QRCode) {
      toast.error('QR코드를 받아오지 못했습니다.');
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (event.target) setQRSrc(String(event.target.result));
    };
    fileReader.readAsDataURL(QRCode);
  }, [QRCode]);

  return (
    <LoginTemplate
      input={<img alt="QR Code" src={QRImageSrc} />}
      button={<Button>2FA 등록</Button>}
    />
  );
};

export default MFAPage;
