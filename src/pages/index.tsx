/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useAuth from '@/store/useAuth';
import { useRouter } from 'next/router';
import Home from '@/components/Home';

const DashboardPage = () => {
  const { checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/authentication');
    }
  }, []);
  return <Home />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default DashboardPage;