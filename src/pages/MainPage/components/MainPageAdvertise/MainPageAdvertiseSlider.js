import { useContext, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageAdvertiseSlider = () => {
  const { baseUrl, MainPageData } = useContext(CustomContext);
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();

  const setDiscountSlider = (slider) => {
    return slider.map(({ id, Url, Img }) => {
      let loaded = false;
      return (
        <Carousel.Item key={id} onClick={() => navigate(Url)}>
          <p className='advertise-slide'>
            <img
              style={loaded ? {} : { display: 'none' }}
              className='d-block'
              src={`${baseUrl}${Img.url}`}
              alt={Url}
              onLoad={() => setOnLoad(true)}
            />
          </p>
        </Carousel.Item>
      );
    });
  };

  return (
    <div className='mainPageAdvertiseSlider'>
      <Carousel
        style={onLoad ? {} : { display: 'none' }}
        interval='2300'
        pause='hover'
        variant='dark'
        indicators>
        {setDiscountSlider(MainPageData.discountGallery.Slide)}
      </Carousel>
      {onLoad ? null : <Skeleton width='100%' height='100%' />}
    </div>
  );
};

export default MainPageAdvertiseSlider;
