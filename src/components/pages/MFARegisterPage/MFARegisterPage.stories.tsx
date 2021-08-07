import React from 'react';
import { Meta } from '@storybook/react';
import { ToastContainer } from 'react-toastify';
import MFARegisterPage from './MFARegisterPage';
import { ContextProvider } from '../../../utils/hooks/useContext';

export default {
  component: MFARegisterPage,
  title: 'pages/MFARegisterPage',
} as Meta;

export const Login = () => (
  <ContextProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <MFARegisterPage />
  </ContextProvider>
);
