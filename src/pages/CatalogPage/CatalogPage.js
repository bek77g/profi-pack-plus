import React from 'react';
import arr from '../../assets/icons/arr.svg';
import Form from 'react-bootstrap/Form';
import CatalogPageCards from './components/CatalogPageCards/CatalogPageCards';
import { Helmet } from 'react-helmet';

const CatalogPage = () => {
  return (
    <>
      <Helmet>
        {/* HTML Meta Tags */}
        <title>ProfiPuckPlus - Каталог</title>
        <meta name='title' content='ProfiPuckPlus - Каталог' />
        <meta name='description' content='Интернет магазин ProfiPuckPlus' />
        {/* Facebook Meta Tags */}
        <meta property='og:title' content='ProfiPuckPlus - Каталог' />
        <meta
          property='og:description'
          content='Интернет магазин ProfiPuckPlus'
        />
        {/* <meta property='og:image' itemProp='image' content={MAIN_IMAGE_URL} /> */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        {/* Twitter Meta Tags */}
        <meta property='twitter:title' content='ProfiPuckPlus - Каталог' />
        <meta
          property='twitter:description'
          content='Интернет магазин ProfiPuckPlus'
        />
        <meta property='twitter:domain' content='studkgreen.kg' />
        <meta property='twitter:url' content={window.location.href} />
        {/* <meta
          property='twitter:image'
          itemProp='image'
          content={MAIN_IMAGE_URL}
        />
        <meta property='twitter:card' content={MAIN_IMAGE_URL} /> */}
      </Helmet>
      <div className='catalogPage'>
        <div className='catalogPage__top'>
          <span>
            Главная <img src={arr} alt='' />
          </span>
          <span>Каталог</span>
          <h2>Каталог</h2>
        </div>
        <div className='catalogPage__mid'>
          <div></div>
          <div className='catalogPage__mid__select'>
            <select name='' id=''>
              <option value='1'>По популярности</option>
              <option value='1'>По цене</option>
              <option value='1'>По дате</option>
            </select>
          </div>
        </div>
        <div className='catalogPage__content'>
          <div className='catalogPage__content__left'>
            <span>Параметры</span>
            <div className='catalogPage__content__left__price'>
              <Form.Label>Цена</Form.Label>
              <Form.Range />
              от 100.000 до 500.000
            </div>
          </div>
          <div className='catalogPage__content__right'>
            <CatalogPageCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
