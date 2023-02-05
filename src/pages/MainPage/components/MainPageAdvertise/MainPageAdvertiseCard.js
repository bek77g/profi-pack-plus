import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomContext } from '../../../../hoc/mainContentContext';
import Skeleton from 'react-loading-skeleton';

const MainPageAdvertiseCard = () => {
  const { baseUrl, MainPageData } = useContext(CustomContext);
  const { title, url, priceBefore, currentPrice, discountPeriod, img } =
    MainPageData.discount;
  let navigate = useNavigate();
  return (
    <div className='mainPageAdvertiseCard'>
      <div className='mainPageAdvertiseCard__top'>
        <div className='mainPageAdvertiseCard__top__left'>Акция</div>
        <div className='mainPageAdvertiseCard__top__right'>
          {currentPrice ? (
            <p>{currentPrice} сом</p>
          ) : (
            <Skeleton width='100px' height='30px' />
          )}
          {priceBefore ? (
            <p>{priceBefore} сом</p>
          ) : (
            <Skeleton width='60px' height='12px' />
          )}
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
        {discountPeriod ? (
          <>
            Акция действует до
            <p>{discountPeriod}</p>
          </>
        ) : (
          <>
            <Skeleton width='160px' height='18px' />
            <Skeleton width='120px' height='18px' />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPageAdvertiseCard;
