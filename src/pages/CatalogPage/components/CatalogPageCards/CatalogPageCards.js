import React, { useEffect, useState } from 'react';
import cart from '../../../../assets/icons/cart.svg';
import PaginationComp from '../../../../components/Pagination';
import { Link } from 'react-router-dom';
import heart from '../../../../assets/icons/favourite.svg';
import { HandySvg } from 'handy-svg';
import { toast, Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { favsProduct, limitCount, pagesHandler } from '../../../../hoc/Hooks';

const Products = ({ data }) => {
  const { baseUrl, addCart, addFav } = useContext(CustomContext);
  const [count, setCount] = useState(1);

  const {
    Title,
    Slug,
    Price,
    Gallery,
    CountType,
    New,
    favorite,
    BestSeller,
    Count,
    MinCount,
  } = favsProduct(data);

  const addToCart = () => {
    addCart(data, count);
    toast.success('Товар добавлен в корзину');
  };
  const addToFav = () => {
    addFav(data);
    favorite
      ? toast.success('Товар удалён из избранных')
      : toast.success('Товар добавлен в избранное');
  };

  useEffect(() => setCount(MinCount), []);

  return (
    <div className='mainPagePopular__catalog__cards__card'>
      <div className='mainPagePopular__catalog__cards__card__tags'>
        {New && (
          <div className='mainPagePopular__catalog__cards__card__new'>
            Новинка
          </div>
        )}
        {BestSeller && (
          <div className='mainPagePopular__catalog__cards__card__hit'>Хит</div>
        )}
      </div>
      <div className='mainPagePopular__catalog__cards__card__heart'>
        <p
          className={`icon ${favorite ? 'active' : ''}`}
          onClick={() => addToFav()}>
          <p>
            <HandySvg width='24' height='24' src={heart} />
          </p>
        </p>
      </div>
      <div className='mainPagePopular__catalog__cards__card__img'>
        <Link to={Slug}>
          <img
            className='d-block w-100'
            src={`${baseUrl}${Gallery[0].url}`}
            alt={Title}
          />
        </Link>
      </div>
      <div className='mainPagePopular__catalog__cards__card__descr'>
        <Link to={Slug}>
          <h5>{Title}</h5>
        </Link>
        <div className='mainPagePopular__catalog__cards__card__cart'>
          <Link to={Slug}>
            <p style={{ lineHeight: '23px' }}>
              {Price} сом/{CountType}
              <br />
              <i style={{ fontStyle: 'initial', fontSize: '18px' }}>
                {(Price * count).toFixed(2)} сом
              </i>
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
            onClick={() =>
              setCount(count <= MinCount ? MinCount : count - MinCount)
            }>
            -
          </button>
          <input
            type='text'
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            onChange={(e) => {
              let num = +e.target.value;
              setCount(num >= Count ? limitCount(num, Count) : num);
            }}
            className='form-control form-control-color'
            value={count}
          />
          <button
            type='button'
            className='btn btn-info'
            onClick={() =>
              setCount(
                count >= Count ? limitCount(count, Count) : count + MinCount
              )
            }>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const CatalogPageCards = ({ products, sortType, minPrice, maxPrice }) => {
  const [page, setPage] = useState(1);

  const showProducts = () => {
    let array = products
      .filter((product) => {
        if (minPrice !== undefined && maxPrice !== undefined) {
          return product.Price >= minPrice && product.Price <= maxPrice;
        }
        return product;
      })
      .sort((a, b) => {
        if (sortType === 'priceInc') {
          return a.Price - b.Price;
        }
        if (sortType === 'priceDec') {
          return b.Price - a.Price;
        }
        if (sortType === 'priceDate') {
          return a.publishedAt - b.publishedAt;
        }
      })
      .map((product) => <Products key={product.id} data={product} />);
    return pagesHandler(array, 12, page);
  };

  return (
    <>
      <div className='catalogPagePopular__catalogs__cards'>
        {products && showProducts()}
      </div>
      {products.length >= 12 && (
        <PaginationComp
          setPage={setPage}
          page={page}
          pageSize={products.length}
        />
      )}
      <Toaster position='bottom-center' />
    </>
  );
};

export default CatalogPageCards;
