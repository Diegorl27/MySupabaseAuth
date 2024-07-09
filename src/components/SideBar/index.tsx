// components/Sidebar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaRegImage } from 'react-icons/fa';
import { Avatar } from '@nextui-org/react';
import useStore from '@/store/useStore';
import useAuth from '@/store/useAuth';
import { AiOutlineShopping } from 'react-icons/ai';
import { IoMdLogOut } from 'react-icons/io';

const Sidebar = () => {
  const { setActiveSectionDashboard, activeSectionDashboard } = useStore((state) => state);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/authentication';
  };

  return (
    <>
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 h-full w-[70px] bg-white shadow-lg z-10 flex flex-col items-center py-6"
      >
        <div className="flex flex-col space-y-6 flex-grow">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center cursor-pointer p-4 hover:bg-gray-100 rounded-lg"
          >
            <Avatar className="text-gray-400" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveSectionDashboard(1)}
            className="flex items-center cursor-pointer p-4 hover:bg-gray-100 rounded-lg"
          >
            <AiOutlineShopping size="26" className={activeSectionDashboard === 1 ? 'text-pink-500' : 'text-gray-400'} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveSectionDashboard(2)}
            className="flex items-center cursor-pointer p-4 hover:bg-gray-100 rounded-lg"
          >
            <FaRegImage size="24" className={activeSectionDashboard === 2 ? 'text-pink-500' : 'text-gray-400'}/>
          </motion.div>
        </div>
        <div className="mt-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={handleLogout}
            className="flex items-center cursor-pointer p-4 hover:bg-gray-100 rounded-lg"
          >
            <IoMdLogOut size="24" className="text-gray-400" />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
