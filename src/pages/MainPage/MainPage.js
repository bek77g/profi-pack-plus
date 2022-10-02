import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import MainPageAdvertise from './components/MainPageAdvertise/MainPageAdvertise';
import MainPageSearch from './components/MainPageSearch/MainPageSearch';
import MainPagePopular from './components/MainPagePopular/MainPagePopular';
import MainPageSearchSelect from './components/MainPageSearch/MainPageSearchSelect';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';

const MainPage = () => {
  const { mainPageSEO } = useContext(CustomContext);
  return (
    <>
      <SEO
        SeoTitle={mainPageSEO.SeoTitle}
        SeoDescription={mainPageSEO.SeoDescription}
      />
      <div className='mainPage'>
        <MainPageSearchSelect />
        <MainPageAdvertise />
        <MainPageSearch />
        <MainPagePopular />
      </div>
    </>
  );
};

export default MainPage;
