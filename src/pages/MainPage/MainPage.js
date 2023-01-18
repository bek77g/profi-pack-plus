import { useContext } from 'react';
import MainPageAdvertise from './components/MainPageAdvertise/MainPageAdvertise';
import MainPageSearch from './components/MainPageSearch/MainPageSearch';
import MainPagePopular from './components/MainPagePopular/MainPagePopular';
import MainPageSearchSelect from './components/MainPageSearch/MainPageSearchSelect';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { MainPageData } = useContext(CustomContext);
  return (
    <>
      <SEO
        SeoTitle={MainPageData?.mainPageSEO?.SeoTitle}
        SeoDescription={MainPageData?.mainPageSEO?.SeoDescription}
      />
      <div className='mainPage'>
        <ul className='header__nav__bar mobile'>
          <li className='header__nav__bar__item header__nav__bar__item__prelast'>
            <Link to='/about'>О нас</Link>
          </li>
          <li className='header__nav__bar__item header__nav__bar__item__prelast'>
            <Link to='/partnership'>Сотрудничество</Link>
          </li>
          <li className='header__nav__bar__item header__nav__bar__item__prelast'>
            <Link to='/order'>Доставка</Link>
          </li>
          <li className='header__nav__bar__item header__nav__bar__item__prelast'>
            <Link to='/contacts'>Контакты</Link>
          </li>
        </ul>
        <MainPageSearchSelect />
        <MainPageAdvertise />
        <MainPageSearch />
        <MainPagePopular />
      </div>
    </>
  );
};

export default MainPage;
