// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/store/useAuth';

const useAuthRedirect = () => {
  const router = useRouter();
  const { checkAuth } = useAuth();

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/authentication');
    }
  }, [router, checkAuth]);
};

export default useAuthRedirect;
