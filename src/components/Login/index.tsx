/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaApple, FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Button, Input } from '@nextui-org/react';
import { BiUser } from 'react-icons/bi';
import { CiLock } from 'react-icons/ci';
import { BsArrowRight } from 'react-icons/bs';
import useStore from '@/store/useStore';
import { toast } from 'sonner';
import useAuth from '@/store/useAuth';

const Login = () => {
  const { t } = useTranslation('common');
  const { activeSection, setActiveSection } = useStore((state) => state);
  const [email, setEmail] = useState('');
  const [loading, setloadig] = useState(false);
  const [password, setPassword] = useState('');
  const { login, user, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setloadig(false);
      toast.success(t('loginSuccess'));
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setloadig(false);
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async () => {
    setloadig(true)
    await login(email, password);
  };

  return (
    <div className='flex flex-col h-[100vh] pt-6'>
      <div className="flex-grow flex flex-col">
        <div className='flex-grow'>
          <div className='flex justify-between'>
            <motion.h1
              onClick={() => setActiveSection(1)}
              className={`text-[3rem] font-bold cursor-pointer ${activeSection === 1 ? 'border-black border-b-4' : 'text-gray-400'}`}
              initial={{ borderBottomWidth: 0 }}
              animate={{ borderBottomWidth: activeSection === 1 ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {t('login')}
            </motion.h1>
            <motion.h1
              onClick={() => setActiveSection(2)}
              className={`text-[3rem] font-bold cursor-pointer ${activeSection === 2 ? 'border-black border-b-4' : 'text-gray-400'}`}
              initial={{ borderBottomWidth: 0 }}
              animate={{ borderBottomWidth: activeSection === 2 ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {t('register')}
            </motion.h1>
          </div>
        </div>
        <h2 className="mb-4 font-semibold !text-[25px] text-center w-[80%] m-auto flex-grow">{t('addPhoneOrEmail')}</h2>
        <div className='flex flex-col flex-grow'>
          <Input
            fullWidth
            size="lg"
            placeholder={t('emailOrPhone')}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            radius='full'
            className="!mb-4 rounded-full !border-[#E7E7E9D9] !border-[2px]"
            startContent={<BiUser className='!text-[#747474]' size="24" />}
          />
          <Input
            placeholder={t('password')}
            size="lg"
            radius='full'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            color='secondary'
            className="!mb-4 !rounded-full !border-[#E7E7E9D9] !border-[2px] !shadow-none"
            startContent={<CiLock className='!text-[#747474]' size="24" />}
          />
          <div className='flex flex-col m-auto'>
            <Button
              isLoading={loading}
              onClick={handleLogin}
              className="w-[200px] h-[50px] !m-auto text-[20px] font-semibold bg-pink-500 hover:bg-pink-600 shadow-lg text-white rounded-full py-3"
              endContent={<BsArrowRight className='text-white' size="24" />}
            >
              {t('continue')}
            </Button>
            <div className='flex mt-10 text-center'>
              <motion.p
                className='m-auto text-center text-gray-500 hover:border-b-2 border-black cursor-pointer'
                initial={{ borderBottomWidth: 0 }}
                whileHover={{ borderBottomWidth: 4 }}
                transition={{ duration: 0.1 }}
                onClick={() => setActiveSection(3)}
              >
                {t('forgotPassword')}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4 flex-1">
        <Button className="rounded-full bg-gray-100" color="primary"><FaApple size="24" /></Button>
        <Button className="rounded-full bg-gray-100" color="primary"><FaGoogle size="24" /></Button>
        <Button className="rounded-full bg-gray-100" color="primary"><FaFacebook size="24" /></Button>
      </div>
    </div>
  );
};

export default Login;
