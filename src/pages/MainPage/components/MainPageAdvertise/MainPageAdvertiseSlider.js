import { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageAdvertiseSlider = () => {
  const { baseUrl, discountGallery } = useContext(CustomContext);

  const setDiscountSlider = (slider) => {
    return slider.map(({ Url, Img }) => {
      return (
        <Carousel.Item>
          <Link className='advertise-slide' to={Url}>
            <img
              className='d-block w-100'
              src={`${baseUrl}${Img.url}`}
              alt={Url}
            />
          </Link>
        </Carousel.Item>
      );
    });
  };

  return (
    <div className='mainPageAdvertiseSlider'>
      <Carousel interval='2300' pause='hover' variant='dark'>
        {setDiscountSlider(discountGallery[0].Slide)}
      </Carousel>
    </div>
  );
};

export default MainPageAdvertiseSlider;
