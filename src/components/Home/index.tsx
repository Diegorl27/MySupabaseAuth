import useStore from '@/store/useStore';
import React from 'react'
import LayoutDashboard from '../LayoutDashboard';
import Orders from '../Orders';
import ImageGallery from '../ImageGallery';

const sections: { [key: number]: JSX.Element } = {
  1: <Orders />,
  2: <ImageGallery />,
};

const Home = () => {
  const activeSection = useStore((state) => state.activeSectionDashboard);
  return (
    <LayoutDashboard>
    {sections[activeSection]}
  </LayoutDashboard>
  )
}

export default Home