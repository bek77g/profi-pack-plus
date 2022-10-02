import React, { useState } from 'react';
import heart from '../../../../assets/icons/favourite.svg';
import cart from '../../../../assets/icons/cart.svg';
import PaginationComp from '../../../../components/Pagination';
import { Link } from 'react-router-dom';
import { HandySvg } from 'handy-svg';
import { toast, Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { CustomContext } from '../../../../hoc/mainContentContext';

const Products = ({ data }) => {
  const { baseUrl } = useContext(CustomContext);
  const [count, setCount] = useState(1);

  const { id, Title, Description, Slug, Price, Gallery, New, CountType } = data;

  const addToCart = () => {
    toast.success('Товар добавлен в корзину');
  };

  return (
    <div key={id} className='mainPagePopular__catalog__cards__card'>
      <div className='mainPagePopular__catalog__cards__card__heart'>
        <img src={heart} alt='heart' />
      </div>
      <div className='mainPagePopular__catalog__cards__card__img'>
        <Link to='/products'>
          <img
            className='d-block w-100'
            src={`${baseUrl}${Gallery[0].url}`}
            alt={Title}
          />
        </Link>
      </div>
      <div className='mainPagePopular__catalog__cards__card__descr'>
        <Link to='/products'>
          <h5>{Title}</h5>
        </Link>
        <div className='mainPagePopular__catalog__cards__card__cart'>
          <Link to='/products'>
            <p>
              {Price} сом/{CountType}
            </p>
          </Link>
          <span onClick={() => addToCart()}>
            <HandySvg src={cart} className='icon' width='30' height='30' />
          </span>
        </div>
        <div className='catalogPagePopular__catalogs__cards__card__quantity'>
          <button
            type='button'
            className='btn btn-info'
            onClick={() => setCount(count - 1)}>
            -
          </button>
          <input
            type='number'
            className='form-control form-control-color'
            value={count}
          />
          <button
            type='button'
            className='btn btn-info'
            onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const CatalogPageCards = ({ products }) => {
  const showProducts = () => {
    return products.map((product) => <Products data={product} />);
  };

  return (
    <>
      <div className='catalogPagePopular__catalogs__cards'>
        {products && showProducts()}
      </div>
      <PaginationComp />
      <Toaster />
    </>
  );
};

export default CatalogPageCards;
