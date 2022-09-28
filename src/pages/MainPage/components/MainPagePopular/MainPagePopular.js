import React from 'react';
import { HandySvg } from 'handy-svg';
import { Link } from 'react-router-dom';
import MainPageSearchSelect from '../MainPageSearch/MainPageSearchSelect';
import Carousel from 'react-bootstrap/Carousel';
import heart from '../../../../assets/icons/favourite.svg';
import cart from '../../../../assets/icons/cart.svg';
import catalog from '../../../../components/constants/catalog';

const MainPagePopular = () => {
  const newCatalog = catalog.map((elem) => {
    return (
      <div className='mainPagePopular__catalog__cards__card'>
        <div className='mainPagePopular__catalog__cards__card__heart'>
          <img src={heart} alt='heart' />
        </div>
        <div className='mainPagePopular__catalog__cards__card__img'>
          <Link to='/products'>
            <img className='d-block w-100' src={elem.img} alt='First slide' />
          </Link>
        </div>
        <div className='mainPagePopular__catalog__cards__card__descr'>
          <Link to='/products'>
            <h5>{elem.description}</h5>
          </Link>
          <div className='mainPagePopular__catalog__cards__card__cart'>
            <Link to='/products'>
              <p>{elem.price}</p>
            </Link>
            <span>
              <HandySvg src={cart} className='icon' width='30' height='30' />
            </span>
          </div>
          <div className='catalogPagePopular__catalogs__cards__card__quantity'>
            <button type='button' className='btn btn-info'>
              -
            </button>
            <input
              type='text'
              className='form-control form-control-color'
              defaultValue={1}
            />
            <button type='button' className='btn btn-info'>
              +
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className='mainPagePopular'>
      {/* <div className='mainPagePopular__catalog'>
                <MainPageSearchSelect/>
            </div> */}
      <Carousel variant='dark'>
        <Carousel.Item>
          <div className='mainPagePopular__catalog__cards'>{newCatalog}</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='mainPagePopular__catalog__cards'>{newCatalog}</div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainPagePopular;
