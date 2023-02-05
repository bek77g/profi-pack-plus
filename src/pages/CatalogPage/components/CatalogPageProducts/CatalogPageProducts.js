import { useEffect, useState } from 'react';
import SEO from '../../../../hoc/SEO';
import { favsProduct } from '../../../../hoc/Hooks';
import arr from '../../../../assets/icons/arr.svg';
import { HandySvg } from 'handy-svg';
import heart from '../../../../assets/icons/favourite.svg';
import cart from '../../../../assets/icons/cart.svg';
import { Link, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import Loading from '../../../../layout/loading/Loading';
import { useContext } from 'react';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { limitCount } from '../../../../hoc/Hooks';
import ReactMarkdown from 'react-markdown';
import Carousel from 'react-bootstrap/Carousel';
import Fancybox from '../../../../utils/FancyBox';
import { goToTop } from '../../../../hooks/goToTop';
import { useRef } from 'react';
// import {
//   ReviewsConfigContext,
//   // Reviews,
//   // ReviewForm,
//   // ErrorBox,
// } from 'strapi-ratings-client';

const CatalogPageProducts = () => {
  const { baseUrl, addCart, addFav } = useContext(CustomContext);
  // const { setContentID, setCanPostReview } = useContext(ReviewsConfigContext);
  const [count, setCount] = useState(1);
  const [thumbState, setThumbState] = useState(0);
  const { catalog, subCatalog, product } = useParams();
  const ref = useRef();

  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState({});

  const {
    id,
    CountType,
    Description,
    Discount,
    Gallery,
    Availability,
    New,
    Price,
    ProductSEO,
    Title,
    sub_catalog,
    BestSeller,
    MinCount,
    favorite,
  } = favsProduct(productData);

  // useEffect(() => {
  //   setContentID(id);
  //   setCanPostReview(true);
  // }, [product]);

  useEffect(() => {
    axios(`api/products/${product}`)
      .then(({ data }) => data.data)
      .then((res) => {
        setProductData(res);
        setLoading(false);
        setCount(res.MinCount);
      });
    goToTop();
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const addToCart = (id, quantity) => {
    addCart(id, quantity);
    toast.success('Товар добавлен в корзину');
  };

  const addToFav = () => {
    addFav(productData);
    favorite
      ? toast.success('Товар удалён из избранных')
      : toast.success('Товар добавлен в избранное');
  };

  const productSliderThumbs = () => {
    return Gallery.map(({ formats, url, alternativeText }, idx) => {
      return (
        <div
          className={`catalogPageImg ${thumbState === idx ? 'active' : ''}`}
          data-bs-target='#carouselExampleDark'
          data-bs-slide-to={idx}
          onClick={() => setThumbState(idx)}
          aria-label={alternativeText}>
          <img
            className='img-thumbnail'
            src={`${baseUrl}${formats ? formats.thumbnail.url : url}`}
            alt={alternativeText}
          />
        </div>
      );
    });
  };

  const handleSelect = (selectedIndex, e) => {
    if (selectedIndex >= Gallery.length || selectedIndex < 0) {
      this.setThumbState(0);
    } else if (selectedIndex !== thumbState) {
      setThumbState(selectedIndex);
    }
  };

  return (
    <>
      <SEO
        SeoTitle={ProductSEO?.SeoTitle}
        SeoDescription={ProductSEO?.SeoDescription}
      />
      <div className='catalogPageProducts' ref={ref}>
        {!loading ? (
          <>
            <div className='catalogPageProducts__top'>
              <span className={`icon ${favorite ? 'active' : ''}`}>
                <Link to='/'>
                  Главная{' '}
                  <span>
                    <img src={arr} alt='arrow' />
                  </span>
                </Link>
              </span>
              <span>
                <Link to={`/${catalog}`}>
                  {sub_catalog.catalog.Title}{' '}
                  <span>
                    <img src={arr} alt='' />
                  </span>
                </Link>
              </span>
              <span>
                <Link to={`/${catalog}/${subCatalog}`}>
                  {sub_catalog.Title}{' '}
                  <span>
                    <img src={arr} alt='arrow' />
                  </span>
                </Link>
              </span>
              <span>{Title}</span>
            </div>
            <div className='catalogPageProducts__content'>
              <div className='catalogPageProducts__content__left'>
                <div className='catalogPageProducts__content__left__card'>
                  <div className='catalogPageProducts__content__left__card__top'>
                    {!Discount && <span>Скидка</span>}
                    {New && <span>Новинка</span>}
                    {BestSeller && <span className='bestseller'>Хит</span>}
                  </div>
                  <div className='catalogPageProducts__content__left__card__mid'>
                    <Fancybox>
                      <Carousel
                        indicators={false}
                        className='catalogPageCarouselCard'
                        variant='dark'
                        controls={Gallery.length > 1}
                        onSelect={handleSelect}
                        activeIndex={thumbState}>
                        {Gallery.map(
                          ({ id, alternativeText, url, width }, idx) => {
                            return (
                              <Carousel.Item key={id}>
                                <a
                                  data-fancybox='slider'
                                  href={`${baseUrl}${url}`}
                                  data-sizes={`(max-width: ${width})`}>
                                  <img
                                    style={{
                                      width: '100%',
                                      maxHeight: '390px',
                                      minWidth: '300px',
                                    }}
                                    className='img-thumbnail'
                                    src={`${baseUrl}${url}`}
                                    alt={alternativeText}
                                  />
                                </a>
                              </Carousel.Item>
                            );
                          }
                        )}
                      </Carousel>
                    </Fancybox>
                    <div className='catalogPageSubCarousel d-flex justify-content-between mt-3'>
                      {Gallery.length > 1 && productSliderThumbs()}
                    </div>
                  </div>
                </div>
              </div>
              <div className='catalogPageProducts__content__right'>
                <div className='catalogPageProducts__content__right__top'>
                  <div className='catalogPageProducts__content__right__top__title'>
                    {Title}
                  </div>
                  <p>
                    Код товара: {sub_catalog.catalog.id}-{sub_catalog.id}-{id}
                  </p>
                  <div className='mb-3 catalogInfo'>
                    <span onClick={() => addToFav()}>
                      <HandySvg src={heart} width='24' height='22' />
                    </span>
                    <span onClick={() => addCart(productData, count)}>
                      <HandySvg src={cart} width='30' height='23' />
                    </span>
                    <span
                      className={`catalogPageProducts__content__availability catalogPageProducts__content__availability--${
                        Availability ? 'stock' : 'nonstock'
                      }`}>
                      {Availability ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </div>
                </div>
                <div className='catalogPageProducts__content__wrapper'>
                  <div className='catalogPageProducts__content__left__card__bottom'>
                    {Discount > 0 && (
                      <p className='catalogPageProducts__content__left__card__bottom-discount'>
                        {Discount} сом
                      </p>
                    )}
                    <p>
                      {Price} сом/{CountType}
                      <br />
                      <span className='catalogPageProducts__content__left__card__bottom-minCount'>
                        ({(count * Price).toFixed(2)} сом)
                      </span>
                    </p>
                  </div>
                  <div className='catalogPagePopular__catalogs__cards__card__quantity justify-content-start mb-0'>
                    <button
                      type='button'
                      className='btn btn-info'
                      onClick={() =>
                        setCount(
                          count <= MinCount ? MinCount : count - MinCount
                        )
                      }>
                      -
                    </button>
                    <input
                      type='text'
                      onKeyPress={(e) =>
                        !/[0-9]/.test(e.key) && e.preventDefault()
                      }
                      onChange={(e) => {
                        let num = +e.target.value;
                        setCount(num);
                      }}
                      className='form-control form-control-color'
                      value={count}
                    />
                    <button
                      type='button'
                      className='btn btn-info'
                      onClick={() => setCount(count + MinCount)}>
                      +
                    </button>
                  </div>
                  <div className='catalogPageProducts__content__right__bottom'>
                    <button
                      className='catalogPageProducts__content__right__bottom__btn'
                      onClick={() => addToCart(productData, count)}>
                      В корзину
                    </button>
                  </div>
                </div>
                <div className='catalogPageProducts__content__right__mid'>
                  <h2>Описание</h2>
                  <p>
                    <ReactMarkdown children={Description} />
                  </p>
                </div>
              </div>
              <Toaster position='bottom-center' />
            </div>
            {/* <ReviewForm />
          <ErrorBox /> */}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default CatalogPageProducts;
