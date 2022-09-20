import React from 'react';
import heart from '../../../../assets/icons/favourite.svg';
import cart from '../../../../assets/icons/cart.svg';
import secondCatalog from '../../../../components/constants/secondCatalog';
import PaginationComp from '../../../../components/Pagination';
import { Link } from 'react-router-dom';
import { HandySvg } from 'handy-svg';

const CatalogPageCards = () => {
  const newCatalog = secondCatalog.map((elem) => {
    return (
      <>
        <div className='catalogPagePopular__catalogs__cards__card'>
          <div className='catalogPagePopular__catalogs__cards__card__heart'>
            <img src={heart} alt='heart' />
          </div>
          <div className='catalogPagePopular__catalogs__cards__card__img'>
            <Link to='/products'>
              <img className='d-block w-100' src={elem.img} alt='First slide' />
            </Link>
          </div>
          <div className='catalogPagePopular__catalogs__cards__card__descr'>
            <Link to='/products'>
              <h5>{elem.description}</h5>
            </Link>
            <div className='catalogPagePopular__catalogs__cards__card__cart'>
              <Link to='/products'>
                <p>{elem.price}</p>
              </Link>
              <span>
                <HandySvg src={cart} className='icon' width='30' height='30' />
              </span>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className='catalogPagePopular__catalogs__cards'>{newCatalog}</div>
      <PaginationComp />
    </>
  );
};

export default CatalogPageCards;
