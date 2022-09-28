import Carousel from 'react-bootstrap/Carousel';

const MainPageAdvertiseSlider = () => {
  return (
    <div className='mainPageAdvertiseSlider'>
      <Carousel interval='2300' pause='hover' variant='dark'>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://md-eksperiment.org/images/posts/0f60e764-5372-40e6-bb78-19d41fe2b1be.jpeg'
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://md-eksperiment.org/images/posts/0f60e764-5372-40e6-bb78-19d41fe2b1be.jpeg'
            alt='Second slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://md-eksperiment.org/images/posts/0f60e764-5372-40e6-bb78-19d41fe2b1be.jpeg'
            alt='Third slide'
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainPageAdvertiseSlider;
