import { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageAdvertiseSlider = () => {
  const { baseUrl, MainPageData } = useContext(CustomContext);
  const navigate = useNavigate();

  const setDiscountSlider = (slider) => {
    return slider.map(({ id, Url, Img }) => {
      return (
        <Carousel.Item key={id} onClick={() => navigate(Url)}>
          <p className='advertise-slide'>
            <img
              loop='infinite'
              className='d-block'
              src={`${baseUrl}${Img.url}`}
              alt={Url}
            />
          </p>
        </Carousel.Item>
      );
    });
  };

  return (
    <div className='mainPageAdvertiseSlider'>
      <Carousel interval='2300' pause='hover' variant='dark' indicators>
        {setDiscountSlider(MainPageData.discountGallery[0].Slide)}
      </Carousel>
    </div>
  );
};

export default MainPageAdvertiseSlider;
