import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageAdvertiseCard = () => {
  const { baseUrl, MainPageData } = useContext(CustomContext);
  const { title, url, priceBefore, currentPrice, discountPeriod, img } =
    MainPageData.discount[0];
  let navigate = useNavigate();
  return (
    <div className='mainPageAdvertiseCard'>
      <div className='mainPageAdvertiseCard__top'>
        <div className='mainPageAdvertiseCard__top__left'>Акция</div>
        <div className='mainPageAdvertiseCard__top__right'>
          <p>{currentPrice}</p>
          <p>{priceBefore}</p>
        </div>
      </div>
      <div className='mainPageAdvertiseCard__mid' onClick={() => navigate(url)}>
        <div
          className='mainPageAdvertiseCard__mid__img'
          style={{
            background: `url(${baseUrl}${img.url}) center/contain no-repeat`,
          }}></div>
        <div className='mainPageAdvertiseCard__mid__description'>
          <p>{title}</p>
        </div>
      </div>
      <div className='mainPageAdvertiseCard__bottom'>
        Акция действует до
        <p>{discountPeriod}</p>
      </div>
    </div>
  );
};

export default MainPageAdvertiseCard;
