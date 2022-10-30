import React, { useState } from 'react';
import arr from '../../assets/icons/arr.svg';
import empty from '../../assets/icons/empty.svg';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import CatalogPageCards from '../CatalogPage/components/CatalogPageCards/CatalogPageCards';
import { HandySvg } from 'handy-svg';

const FavouritePage = () => {
  const { favorite } = useContext(CustomContext);
  const [sortType, setSortType] = useState('priceInc');

  return (
    <>
      <SEO
        SeoTitle='ProfiPackPlus - Избранное'
        SeoDescription='Ваши избранные в магазине Profipackplus'
      />
      <div className='catalogPage favorites'>
        <div className='catalogPage__top'>
          <span>
            <Link to='/'>
              Главная <img src={arr} alt='arr' />
            </Link>
          </span>
          <span>Избранные</span>
          <h2>Избранные</h2>
        </div>
        {favorite.length !== 0 ? (
          <>
            <div className='catalogPage__mid'>
              <div></div>
              <div className='catalogPage__mid__select'>
                <select onChange={(e) => setSortType(e.target.value)}>
                  <option value='priceInc'>По возрастанию цены</option>
                  <option value='priceDec'>По убыванию цены</option>
                  <option value='priceDate'>По дате</option>
                </select>
              </div>
            </div>
            <div className='catalogPage__content'>
              <div className='catalogPage__content__right'>
                <CatalogPageCards products={favorite} sortType={sortType} />
              </div>
            </div>
          </>
        ) : (
          <div className='cartPageEmpty'>
            <div className='cartPageEmpty__bundle'>
              <span>
                <HandySvg src={empty} />
              </span>
            </div>
            <div className='cartPageEmpty__title'>
              Ваша каталог избранных пуст
            </div>
            <div className='cartPageEmpty__subtitle'>
              Самое время добавить в нее что-нибудь
            </div>
            <div className='cartPageEmpty__back'>
              <Link to='/'>
                <button type='button' className='btn btn-outline-secondary'>
                  Перейти в каталог
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FavouritePage;
