import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../SideBar';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { Toaster } from 'sonner';
import useAuth from '@/store/useAuth';

const LayoutDashboard = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  useAuthRedirect();
  return (
    <div className="flex">
      {user &&
        <>
          <div className='flex-2 pl-20'>
            <Sidebar />
          </div>
          <motion.div
            className="flex-1 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
          <Toaster />
        </>
      }
    </div>
  );
};

export default LayoutDashboard;
