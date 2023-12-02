import { useRef } from 'react';
import SEO from '../../hoc/SEO';
import PaginationComp from '../../components/Pagination';
import {
  Link,
  ScrollRestoration,
  useLocation,
  useParams,
} from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Loading from '../../layout/loading/Loading';
import { useContext } from 'react';
import { CustomContext } from '../../hoc/mainContentContext';
import { goToTop } from '../../hooks/goToTop';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import Skeleton from 'react-loading-skeleton';

const SubCategoryPage = () => {
  const { baseUrl } = useContext(CustomContext);
  const { catalog } = useParams();
  const location = useLocation();
  const [page, setPage] = useSearchParamsState('page', { defaultValue: 1 });
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  const [catalogSeo, setCatalogSeo] = useState({});
  const [title, setTitle] = useState('');
  const [subCatalogs, setSubCatalogs] = useState([]);

  // useEffect(() => {
  //   goToTop();
  //   ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/sub-catalogs?populate[Icon][populate]=*&populate[catalog][populate]=*&filters[catalog][Slug][$eq]=${catalog}
    `
      )
      .then(({ data }) => {
        setCatalogSeo(data.data[0].catalog.CatalogSEO);
        setTitle(data.data[0].catalog.Title);
        setSubCatalogs(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setCatalogSeo({
          SeoTitle: 'Не найдено',
          SeoDescription: 'Не найдено',
        });
        setTitle('Не найдено');
        setSubCatalogs([]);
        setLoading(false);
      });
    console.log('Render');
  }, [location]);

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
                  `${baseUrl}${Icon.url}` ||
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

  const showSubCatalogsSkeleton = () => {
    return [...Array(12).keys()].map((_, idx) => {
      return (
        <div
          key={idx}
          className='catalogPagePopular__catalogs__cards__card cartCategory'>
          <Skeleton width='100%' height='200px' />
          <div className='catalogPagePopular__catalogs__cards__card__descr'>
            <h5>
              <Skeleton width='100%' height='21px' />
            </h5>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <SEO
        SeoTitle={catalogSeo?.SeoTitle}
        SeoDescription={catalogSeo?.SeoDescription}
      />
      <div className='catalogPage' ref={ref}>
        <div className='catalogPage__top'>
          <span>
            <Link to='/'>
              Главная <img src={arr} alt='' />
            </Link>
          </span>
          <span>{title || catalog || 'Загрузка...'}</span>
          {!loading && subCatalogs.length > 0 && (
            <h2>{title || catalog || 'Загрузка...'}</h2>
          )}
        </div>
        <div className='catalogPage__content'>
          <div
            className='catalogPage__content__right'
            style={{ margin: '0 auto' }}>
            {!loading && !subCatalogs.length && (
              <>
                <h2>Ничего не найдено</h2>
              </>
            )}
            <div className='catalogPagePopular__catalogs__cards'>
              {!loading && subCatalogs.length > 0
                ? showSubCatalogs()
                : showSubCatalogsSkeleton()}
            </div>
            {subCatalogs.length >= 12 && (
              <PaginationComp
                setPage={setPage}
                page={page}
                pageSize={subCatalogs.length}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryPage;
