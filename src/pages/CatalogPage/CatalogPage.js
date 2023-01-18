import { useEffect, useRef, useState } from 'react';
import SEO from '../../hoc/SEO';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import arr from '../../assets/icons/arr.svg';
import Form from 'react-bootstrap/Form';
import CatalogPageCards from './components/CatalogPageCards/CatalogPageCards';
import {
  createSearchParams,
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import axios from 'axios';
import Loading from '../../layout/loading/Loading';
import { goToTop } from '../../hooks/goToTop';

const CatalogPage = () => {
  const { subCatalog } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState('priceInc');
  const [priceValue, setPriceValue] = useState({
    min: 0,
    max: 5000,
  });

  const { min, max } = priceValue;

  const [subCatalogSeo, setSubCatalogSeo] = useState({});
  const [catalogOfSubcatalog, setCatalogOfSubcatalog] = useState('');
  const [title, setTitle] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef();

  useEffect(() => {
    goToTop();
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/sub-catalogs/${subCatalog}
    `
      )
      .then(({ data }) => {
        setSubCatalogSeo(data.data.subCatalogSeo);
        setCatalogOfSubcatalog(data.data.catalog);
        setTitle(data.data.Title);
        setProducts(data.data.products.filter((el) => el.publishedAt !== null));
        setLoading(false);
      })
      .catch((e) => {
        setSubCatalogSeo({
          SeoTitle: 'Не найдено',
          SeoDescription: 'Не найдено',
        });
        setCatalogOfSubcatalog({
          Title: 'Не найдено',
          Slug: 'Не найдено',
        });
        setTitle('Не найдено');
        setProducts([]);
        setLoading(false);
      });
  }, [location]);

  return (
    <>
      <SEO
        SeoTitle={subCatalogSeo?.SeoTitle}
        SeoDescription={subCatalogSeo?.SeoDescription}
      />
      <div className='catalogPage' ref={ref}>
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
            {title || subCatalog || 'Загрузка'} <img src={arr} alt='' />
          </span>
          <h2>{title || title}</h2>
        </div>
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
          {loading && <Loading />}
          {!loading && !products.length && (
            <>
              <h2>Ничего не найдено</h2>
            </>
          )}
          {!loading && products.length > 0 && (
            <>
              <div className='catalogPage__content__left'>
                <span>Параметры</span>
                <div className='catalogPage__content__left__price'>
                  <Form.Label>
                    Цена: <br /> от {min} до {max} сом
                  </Form.Label>
                  <InputRange
                    step={5}
                    formatLabel={(value) => null}
                    draggableTrack={false}
                    allowSameValues={false}
                    maxValue={10000}
                    minValue={0}
                    value={priceValue}
                    onChange={setPriceValue}
                    onChangeComplete={() =>
                      setSearchParams({ priceMin: min, priceMax: max })
                    }
                  />
                  от 0 до 10.000 сом
                </div>
              </div>
              <div className='catalogPage__content__right'>
                <CatalogPageCards
                  products={products}
                  sortType={sortType}
                  minPrice={min}
                  maxPrice={max}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
