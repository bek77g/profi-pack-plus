import React, { useEffect, useState } from 'react';
import arr from '../../assets/icons/arr.svg';
import Form from 'react-bootstrap/Form';
import CatalogPageCards from './components/CatalogPageCards/CatalogPageCards';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CatalogPage = () => {
  const { subCatalog } = useParams();
  const [priceValue, setPriceValue] = useState(0);

  const [subCatalogSeo, setSubCatalogSeo] = useState({});
  const [catalogOfSubcatalog, setCatalogOfSubcatalog] = useState('');
  const [title, setTitle] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/api/sub-catalogs/${subCatalog}?populate=deep
    `
      )
      .then(({ data }) => {
        setSubCatalogSeo(data.data.subCatalogSeo);
        setCatalogOfSubcatalog(data.data.catalog);
        setTitle(data.data.Title);
        setProducts(data.data.products);
      });
  }, []);

  return (
    <>
      <div className='catalogPage'>
        <div className='catalogPage__top'>
          <span>
            <Link to='/'>
              Главная <img src={arr} alt='' />
            </Link>
          </span>
          <span>
            <Link to={`/${catalogOfSubcatalog.Slug}`}>
              {catalogOfSubcatalog.Title} <img src={arr} alt='' />
            </Link>
          </span>
          <span>
            {title || title} <img src={arr} alt='' />
          </span>
          <h2>{title}</h2>
        </div>
        <div className='catalogPage__mid'>
          <div></div>
          <div className='catalogPage__mid__select'>
            <select name='' id=''>
              <option value='1'>По цене</option>
              <option value='1'>По дате</option>
            </select>
          </div>
        </div>
        <div className='catalogPage__content'>
          <div className='catalogPage__content__left'>
            <span>Параметры</span>
            <div className='catalogPage__content__left__price'>
              <Form.Label>Цена: {priceValue} сом</Form.Label>
              <Form.Range
                onChange={(e) => setPriceValue(e.target.value)}
                defaultValue='0'
                min='0'
                max='10000'
              />
              от 0 до 10.000 сом
            </div>
          </div>
          <div className='catalogPage__content__right'>
            <CatalogPageCards products={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
