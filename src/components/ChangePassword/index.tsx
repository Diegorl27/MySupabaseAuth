import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabaseClient';
import useStore from '@/store/useStore';
import { Button, Input } from '@nextui-org/react';
import { BsArrowRight } from 'react-icons/bs';
import { SiEmlakjet } from 'react-icons/si';
import { BiUser } from 'react-icons/bi';
import { CiLock } from 'react-icons/ci';
import { toast } from 'sonner';

const ChangePassword = () => {
  const { t } = useTranslation('common');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setloadig] = useState(false);
  const router = useRouter();
  const { setActiveSection } = useStore((state) => state);

  const handleResetPassword = async () => {
    setloadig(true);
    if (password !== confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t('Password Changed'));
      router.push('/autentication');
    }
    setloadig(false);
  };

  return (
    <div className='flex flex-col h-[100vh] pt-6'>
      <div className="flex-grow flex flex-col">
        <div>
          <h1 className="mb-4 font-bold !text-[25px]">{t('forgotPassword')}</h1>
          <h3 className="mb-4 !text-[18px]">{t('forgotPasswordText')}</h3>
        </div>
        <div className='flex flex-col mt-[3rem] gap-10'>
          <Input
            type='password'
            placeholder={t('email')}
            size="lg"
            radius='full'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            color='secondary'
            className="!mb-4 !rounded-full !border-[#E7E7E9D9] !border-[2px] !shadow-none"
            startContent={<CiLock className='!text-[#747474]' size="24" />}
          />
          <Input
            type='password'
            placeholder={t('email')}
            size="lg"
            radius='full'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            color='secondary'
            className="!mb-4 !rounded-full !border-[#E7E7E9D9] !border-[2px] !shadow-none"
            startContent={<CiLock className='!text-[#747474]' size="24" />}
          />
          <div className='flex flex-col m-auto'>
            <Button
              isLoading={loading}
              onClick={handleResetPassword}
              className="w-[200px] h-[50px] !m-auto text-[20px] font-semibold bg-pink-500 hover:bg-pink-600 shadow-lg text-white rounded-full py-3"
              endContent={<BsArrowRight className='text-white' size="24" />}
            >
              {t('continue')}
            </Button>
            <div className='flex gap-2 mt-10'>
              <p className='text-center text-gray-500 font-semibold'>
                {t('remenberPassword')}
              </p>
              <p className='text-center font-semibold text-pink-500 text-decoration-line: underline cursor-pointer' onClick={() => setActiveSection(1)} >
                {t('login')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
