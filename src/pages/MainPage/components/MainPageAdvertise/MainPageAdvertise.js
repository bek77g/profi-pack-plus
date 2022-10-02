import React from 'react';
import MainPageAdvertiseSlider from './MainPageAdvertiseSlider';
import MainPageAdvertiseCard from './MainPageAdvertiseCard';

const MainPageAdvertise = () => {
  return (
    <div className='mainPageAdvertise'>
      <div className='mainPageAdvertise__slider'>
        <MainPageAdvertiseSlider />
      </div>
      <div className='mainPageAdvertise__card'>
        <MainPageAdvertiseCard />
      </div>
    </div>
  );
};

export default MainPageAdvertise;
