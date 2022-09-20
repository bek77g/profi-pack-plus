import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPageAdvertiseCard = () => {
  let navigate = useNavigate();
  return (
    <div className='mainPageAdvertiseCard'>
      <div className='mainPageAdvertiseCard__top'>
        <div className='mainPageAdvertiseCard__top__left'>Акция</div>
        <div className='mainPageAdvertiseCard__top__right'>
          <p>190 000 сом</p>
          <p>225 000 сом</p>
        </div>
      </div>
      <div
        className='mainPageAdvertiseCard__mid'
        onClick={() => navigate('/products')}>
        <div
          className='mainPageAdvertiseCard__mid__img'
          style={{
            backgroundImage:
              'url(https://md-eksperiment.org/images/posts/0f60e764-5372-40e6-bb78-19d41fe2b1be.jpeg)',
          }}></div>
        <div className='mainPageAdvertiseCard__mid__description'>
          <p>Лодочный мотор Suzuki DF9.9BRS</p>
        </div>
      </div>
      <div className='mainPageAdvertiseCard__bottom'>
        Акция действует до
        <p>31.08.2020</p>
      </div>
    </div>
  );
};

export default MainPageAdvertiseCard;
