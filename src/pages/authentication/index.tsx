import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Authentication from '@/components/Authentication';

const LoginPage = () => {
  return <Authentication />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default LoginPage;