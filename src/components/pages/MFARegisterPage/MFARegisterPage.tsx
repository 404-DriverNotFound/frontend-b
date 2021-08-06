// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../atoms/Button/Button';
import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';
import { useAppDispatch } from '../../../utils/hooks/useContext';
import makeAPIPath from '../../../utils/utils';

const MFARegisterPage = () => {
  const [QRCode, setQRCode] = useState<Blob | string>('');
  const [QRImageSrc, setQRSrc] = useState<string>('');
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch({ type: 'loading' });

    fetch(makeAPIPath('/auth/otp/qrcode'), { credentials: 'include' })
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      .then(processChunkedResponse)
      .then((result) => {
        setQRCode(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    function processChunkedResponse(response: any) {
      let text = '';
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      function readChunk() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return reader.read().then(appendChunks);
      }

      function appendChunks(result: any) {
        const chunk = decoder.decode(result.value || new Uint8Array(), { stream: !result.done });
        text += chunk;
        if (result.done) {
          return text;
        }
        return readChunk();
      }
      return readChunk();
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(QRCode);
    if (!QRCode) {
      toast.error('QR코드를 받아오지 못했습니다.');
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (event.target) setQRSrc(String(event.target.result));
    };
    fileReader.readAsDataURL(QRCode as Blob);
  }, [QRCode]);

  return (
    <LoginTemplate
      input={<img alt="QR Code" src={QRImageSrc} />}
      button={<Button>2FA 등록</Button>}
    />
  );
};

export default MFARegisterPage;
