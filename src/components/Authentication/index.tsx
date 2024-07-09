import React, { useState } from 'react';
import Login from '../Login';
import LayoutLogin from '../LayoutLogin';
import useStore from '@/store/useStore';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';
import ChangePassword from '../ChangePassword';

const sections: { [key: number]: JSX.Element } = {
  1: <Login />,
  2: <Register />,
  3: <ForgotPassword />,
  4: <ChangePassword />,
};

const Authentication: React.FC = () => {
  const activeSection = useStore((state) => state.activeSection);

  return (
    <LayoutLogin>
      {sections[activeSection]}
    </LayoutLogin>
  );
}

export default Authentication;
