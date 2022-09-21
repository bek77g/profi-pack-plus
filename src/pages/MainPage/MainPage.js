import React from 'react';
import MainPageAdvertise from './components/MainPageAdvertise/MainPageAdvertise';
import MainPageSearch from './components/MainPageSearch/MainPageSearch';
import MainPagePopular from './components/MainPagePopular/MainPagePopular';
import { Helmet } from 'react-helmet';

const MainPage = () => {
  return (
    <>
      <Helmet>
        {/* HTML Meta Tags */}
        <title>ProfiPuckPlus - Главная</title>
        <meta name='title' content='ProfiPuckPlus - Главная' />
        <meta name='description' content='Интернет магазин ProfiPuckPlus' />
        {/* Facebook Meta Tags */}
        <meta property='og:title' content='ProfiPuckPlus - Главная' />
        <meta
          property='og:description'
          content='Интернет магазин ProfiPuckPlus'
        />
        {/* <meta property='og:image' itemProp='image' content={MAIN_IMAGE_URL} /> */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        {/* Twitter Meta Tags */}
        <meta property='twitter:title' content='ProfiPuckPlus - Главная' />
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
      <div className='mainPage'>
        <MainPageAdvertise />
        <MainPageSearch />
        <MainPagePopular />
      </div>
    </>
  );
};

export default MainPage;
