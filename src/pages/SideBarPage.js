import React, { useContext, useRef } from 'react';
import { CustomContext } from '../hoc/mainContentContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

const SideBarPage = () => {
  const { baseUrl, catalogs, nav, setNav } = useContext(CustomContext);
  const { width } = useWindowDimensions();
  let menuRef = useRef();

  const [mobile, setMobile] = useState('');

  useEffect(() => {
    if (width <= 950) setMobile('mobile');
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', (e) =>
      !menuRef.current.contains(e.target) ? setNav(false) : null
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
                className='sideBar__content__nav__items__item sideBar__block__items '>
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
  return (
    <div className='sideBar'>
      <div
        ref={menuRef}
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
                {setCatalogsToList(catalogs)}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SideBarPage;
