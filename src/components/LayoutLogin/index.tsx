import React, { ReactElement } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { motion } from 'framer-motion';
import useStore from '@/store/useStore';
import { Toaster } from 'sonner';

const LayoutLogin = ({ children }: { children: ReactElement }) => {
  const activeSection = useStore((state) => state.activeSection);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`w-full ${activeSection !== 2 && 'md:w-1/2'} flex flex-col items-center px-6 bg-white h-full overflow-hidden`}>
        <motion.div
          className="w-full max-w-[80%] gap-3 flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
      {activeSection !== 2 && <motion.div
        className="hidden md:flex w-1/2 flex-col items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
      </motion.div>}
      <Toaster />
    </div>
  );
};

export default LayoutLogin;
