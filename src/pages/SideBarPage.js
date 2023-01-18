import { useContext, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { CustomContext } from '../hoc/mainContentContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import axios from 'axios';

const SideBarPage = () => {
  const { baseUrl, nav, setNav, setCatalogs, catalogs } =
    useContext(CustomContext);
  const { width } = useWindowDimensions();

  let menuRef = useRef();

  const [mobile, setMobile] = useState('');

  function getCatalogs() {
    axios
      .get(
        '/api/catalogs?populate[Icon][populate]=*&populate[sub_catalogs][populate]=*'
        // '/api/catalogs?populate[sub_catalogs][populate]=products&populate=Icon'
      )
      .then(({ data }) => {
        setCatalogs(data.data);
      });
  }

  useEffect(() => {
    if (width <= 950) setMobile('mobile');
    getCatalogs();
  }, []);

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      (e) =>
        (!document.querySelector('.header__burger').contains(e.target) ||
          !document
            .querySelector('.header__burger')
            .contains(e.target)
            .querySelector('span') ||
          !menuRef.current.contains(e.target)) &&
        setNav(false)
    );
  });

  const setSubCategoryToList = (sub_catalogs, fromToSlug) => {
    return (
      <ul className='sideBarBlock__sub__nav__bar'>
        {sub_catalogs.map(({ id, Title, Description, Slug, Icon }) => {
          return (
            <li
              title={Description}
              key={id}
              className='sideBarBlock__sub__nav__bar__item sideBarImg'>
              {Icon === null || Icon === undefined ? (
                <div className='sideBarSub__img-skeleton'></div>
              ) : (
                <Link to={`${fromToSlug}/${Slug}`}>
                  <img
                    src={`${baseUrl}${Icon?.url}`}
                    alt={Title}
                    className='sideBarSub__img'
                  />
                </Link>
              )}

              <Link to={`${fromToSlug}/${Slug}`}>
                <p className='sideBarSub__text'>{Title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  const setCatalogsToList = (catalogs) => {
    return (
      <ul className='sideBar__content__nav__items sideBar__block'>
        {catalogs.map(
          ({ id, Title, Slug, Description, sub_catalogs, Icon }) => {
            return (
              <li
                key={id}
                className={`sideBar__content__nav__items__item ${mobile} sideBar__block__items `}>
                <Link to={`/${Slug}`}>
                  {Icon !== null && (
                    <img
                      src={`${baseUrl}${Icon?.url}`}
                      alt={Title}
                      className='sideBar__img'
                    />
                  )}
                  {Icon === null && (
                    <div className='sideBar__img-skeleton'></div>
                  )}
                </Link>
                <Link to={`/${Slug}`}>
                  {' '}
                  <p className='sideBar__text' title={Description}>
                    {Title}
                  </p>
                </Link>
                <div className='sideBarSub'>
                  <h3 className='sideBarSub__title'>{Title}</h3>
                  <div className='sideBarBlock__sub__nav'>
                    {setSubCategoryToList(sub_catalogs, Slug)}
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    );
  };
  const setCatalogsToListSkeleton = () => {
    return (
      <ul className='sideBar__content__nav__items sideBar__block'>
        {[...Array(9)].map((el, idx) => {
          return (
            <li
              key={idx}
              className={`sideBar__content__nav__items__item ${mobile} sideBar__block__items `}
              style={{ marginBottom: '8px' }}>
              <Link to='/'>
                <Skeleton className='sideBar__img' width='60px' height='60px' />
              </Link>
              <Link to='/'>
                <Skeleton
                  className='sideBar__text'
                  width='140px'
                  height='24px'
                />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className='sideBar'>
      <div
        ref={menuRef}
        onClick={() => setNav(!nav)}
        className={`sideBar__pos ${mobile} ${nav ? '' : 'left'}`}>
        <div className='sideBar__content__burger'>
          <div className='sideBar__content__burger__left'>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className='sideBar__content__burger__right sideBar__right'>
            <p>Каталог</p>
          </div>
        </div>
        <div className='sideBar__wrapper'>
          <aside className='sideBar__aside'>
            <div className='sideBar__content'>
              <nav className='sideBar__content__nav'>
                {!!catalogs?.length
                  ? setCatalogsToList(catalogs)
                  : setCatalogsToListSkeleton()}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SideBarPage;
