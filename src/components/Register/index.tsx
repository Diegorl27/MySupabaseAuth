import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { Button, Input, Checkbox } from '@nextui-org/react';
import { BiUser } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import useStore from '@/store/useStore';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { IoIosPhonePortrait } from 'react-icons/io';
import { TfiWorld } from 'react-icons/tfi';
import { MdOutlineEmail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone1: string;
  phone2: string;
  website: string;
  termsAccepted: boolean;
}

const Register: React.FC = () => {
  const { t } = useTranslation('common');
  const { activeSection, setActiveSection } = useStore((state) => state);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    website: '',
    termsAccepted: false,
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = (): boolean => {
    const { email, password, confirmPassword, firstName, lastName, termsAccepted } = formData;
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      toast.error(t('All fields are required'));
      return false;
    }
    if (!validateEmail(email)) {
      toast.error(t('Invalid email format'));
      return false;
    }
    if (password !== confirmPassword) {
      toast.error(t('Passwords do not match'));
      return false;
    }
    if (!termsAccepted) {
      toast.error(t('You must accept the terms and conditions'));
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const { email, password, firstName, lastName, phone1, phone2, website } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone1,
          phone2,
          website,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t('successRegister'));
      setActiveSection(1)
    }
  };

  return (
    <div className='flex flex-col h-[100vh] pt-6'>
      <div className="flex-grow flex flex-col gap-[5rem]">
        <div className='flex flex-col gap-[5rem]'>
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
          <h2 className="mb-4 font-semibold !text-[25px] text-center w-[80%] m-auto flex-grow">{t('welcome')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            fullWidth
            size="lg"
            placeholder={t('firstName')}
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            radius='full'
            color='default'
            className="rounded-full border-[#E7E7E9D9] border-[2px]"
            startContent={<BiUser className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('lastName')}
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px]"
            startContent={<BiUser className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('phone1')}
            name="phone1"
            onChange={handleChange}
            value={formData.phone1}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px]"
            startContent={<IoIosPhonePortrait className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('phone2')}
            name="phone2"
            onChange={handleChange}
            value={formData.phone2}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px]"
            startContent={<FiPhone className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('website')}
            name="website"
            onChange={handleChange}
            value={formData.website}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px]"
            startContent={<TfiWorld className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('email')}
            name="email"
            onChange={handleChange}
            value={formData.email}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px]"
            startContent={<MdOutlineEmail className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('password')}
            name="password"
            type='password'
            onChange={handleChange}
            value={formData.password}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px] shadow-none"
            startContent={<IoLockClosedOutline className='text-[#747474]' size="24" />}
          />
          <Input
            fullWidth
            size="lg"
            placeholder={t('confirmPassword')}
            name="confirmPassword"
            type='password'
            onChange={handleChange}
            value={formData.confirmPassword}
            radius='full'
            className="rounded-full border-[#E7E7E9D9] border-[2px] shadow-none"
            startContent={<IoLockClosedOutline className='text-[#747474]' size="24" />}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Checkbox
            name="termsAccepted"
            isSelected={formData.termsAccepted}
            onChange={(e) => handleChange({ target: { name: 'termsAccepted', value: e.target.checked, type: 'checkbox' } } as any)}
          >
            {t('aceptTerms')}
          </Checkbox>
        </div>
        <Button
          onClick={handleRegister}
          className="w-[200px] h-[50px] !m-auto text-[20px] font-semibold bg-pink-500 hover:bg-pink-600 shadow-lg text-white rounded-full py-3"
          endContent={<BsArrowRight className='text-white' size="24" />}
        >
          {t('register')}
        </Button>
      </div>
    </div>
  );
};

export default Register;
