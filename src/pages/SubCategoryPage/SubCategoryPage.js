import React from 'react';
import secondCatalog from '../../components/constants/secondCatalog';
import PaginationComp from '../../components/Pagination';
import { Link, useParams } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const SubCategoryPage = () => {
  const { catalog } = useParams();

  const [catalogSeo, setCatalogSeo] = useState({});
  const [title, setTitle] = useState('');
  const [subCatalogs, setSubCatalogs] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/api/catalogs/${catalog}?populate=deep
    `
      )
      .then(({ data }) => {
        setCatalogSeo(data.data.catalogSeo);
        setTitle(data.data.Title);
        setSubCatalogs(data.data.sub_catalogs);
      });
  }, []);

  const showSubCatalogs = () => {
    return subCatalogs.map(({ id, Title, Slug, Icon }) => {
      return (
        <div
          key={id}
          className='catalogPagePopular__catalogs__cards__card cartCategory'>
          <div className='catalogPagePopular__catalogs__cards__card__img'>
            <Link to={Slug}>
              <img
                className='d-block w-100'
                src={
                  Icon?.url ||
                  'https://via.placeholder.com/828x828.png?text=ProfiPackPlus+product'
                }
                alt='First slide'
              />
            </Link>
          </div>
          <div className='catalogPagePopular__catalogs__cards__card__descr'>
            <Link to={Slug}>
              <h5>{Title}</h5>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className='catalogPage'>
        <div className='catalogPage__top'>
          <span>
            <Link to='/'>
              Главная <img src={arr} alt='' />
            </Link>
          </span>
          <span>{title && title}</span>
          <h2>{title && title}</h2>
        </div>
        <div className='catalogPage__content'>
          <div
            className='catalogPage__content__right'
            style={{ margin: '0 auto' }}>
            <div className='catalogPagePopular__catalogs__cards'>
              {subCatalogs && showSubCatalogs()}
            </div>
            <PaginationComp />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryPage;
