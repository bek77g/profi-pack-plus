import { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageAdvertiseSlider = () => {
  const { baseUrl, MainPageData } = useContext(CustomContext);

  const setDiscountSlider = (slider) => {
    return slider.map(({ id, Url, Img }) => {
      return (
        <Carousel.Item key={id}>
          <Link className='advertise-slide' to={Url}>
            <img
              loop='infinite'
              className='d-block'
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
        {setDiscountSlider(MainPageData.discountGallery[0].Slide)}
      </Carousel>
    </div>
  );
};

export default MainPageAdvertiseSlider;
