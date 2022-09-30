import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import arr from '../../../../assets/icons/arr.svg';
import {HandySvg} from 'handy-svg';
import heart from '../../../../assets/icons/favourite.svg';
import cart from '../../../../assets/icons/cart.svg';
import {Link} from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";

const Products = (props) => {
    const [count, setCount] = useState(1);

    return (
        <div className='mainPagePopular__catalog__cards__card'>
            <div className='mainPagePopular__catalog__cards__card__heart'>
                <img src={heart} alt='heart'/>
            </div>
            <div className='mainPagePopular__catalog__cards__card__img'>
                <Link to='/products'>
                    <img className='d-block w-100' src={props.data.img} alt='First slide'/>
                </Link>
            </div>
            <div className='mainPagePopular__catalog__cards__card__descr'>
                <Link to='/products'>
                    <h5>{props.data.description}</h5>
                </Link>
                <div className='mainPagePopular__catalog__cards__card__cart'>
                    <Link to='/products'>
                        <p>{props.data.price}</p>
                    </Link>
                    <span>
              <HandySvg src={cart} className='icon' width='30' height='30'/>
            </span>
                </div>
                <div className='catalogPagePopular__catalogs__cards__card__quantity'>
                    <button type='button' className='btn btn-info' onClick={() => setCount(count - 1)}>
                        -
                    </button>
                    <input
                        type='number'
                        className='form-control form-control-color'
                        value={count}
                    />
                    <button type='button' className='btn btn-info' onClick={() => setCount(count + 1)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

const CatalogPageProducts = () => {

    const [count, setCount] = useState(1);

    const addToCart = () => {
        toast.success("Товар добавлен в корзину");
    }

    return (
        <>
            <Helmet>
                {/* HTML Meta Tags */}
                <title>ProfiPuckPlus - Товар</title>
                <meta name='title' content='ProfiPuckPlus - Товар'/>
                <meta name='description' content='Интернет магазин ProfiPuckPlus'/>
                {/* Facebook Meta Tags */}
                <meta property='og:title' content='ProfiPuckPlus - Товар'/>
                <meta
                    property='og:description'
                    content='Интернет магазин ProfiPuckPlus'
                />
                {/* <meta property='og:image' itemProp='image' content={MAIN_IMAGE_URL} /> */}
                <meta property='og:type' content='website'/>
                <meta property='og:url' content={window.location.href}/>
                {/* Twitter Meta Tags */}
                <meta property='twitter:title' content='ProfiPuckPlus - Товар'/>
                <meta
                    property='twitter:description'
                    content='Интернет магазин ProfiPuckPlus'
                />
                <meta property='twitter:domain' content='studkgreen.kg'/>
                <meta property='twitter:url' content={window.location.href}/>
                {/* <meta
          property='twitter:image'
          itemProp='image'
          content={MAIN_IMAGE_URL}
        />
        <meta property='twitter:card' content={MAIN_IMAGE_URL} /> */}
            </Helmet>

            <div className='catalogPageProducts'>
                <div className='catalogPageProducts__top'>
                    <span>Главная</span>
                    <img src={arr} alt='' className='ps-2'/>
                    <span>Каталог</span>
                    <img src={arr} alt=''/>
                    <span>Спасательный жилет BRP Men's Airflow PFD</span>
                </div>
                <div className='catalogPageProducts__content'>
                    <div className='catalogPageProducts__content__left'>
                        <div className='catalogPageProducts__content__left__card'>
                            <div className='catalogPageProducts__content__left__card__top'>
                                <span>Sale</span>
                            </div>
                            <div className='catalogPageProducts__content__left__card__mid'>
                                <div
                                    id='carouselExampleDark'
                                    className='carousel carousel-dark slide'
                                    data-bs-ride='carousel'>
                                    <div className='carousel-inner catalogPageCarouselCard'>
                                        <div className='carousel-inner'>
                                            <div className='carousel-item active'>
                                                <img
                                                    className='img-thumbnail'
                                                    src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_1620416-800x800.webp'
                                                    alt=''
                                                />
                                            </div>
                                            <div className='carousel-item'>
                                                <img
                                                    className='img-thumbnail'
                                                    src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_162113-800x800.webp'
                                                    alt=''
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className='carousel-control-prev'
                                            type='button'
                                            data-bs-target='#carouselExampleDark'
                                            data-bs-slide='prev'>
                      <span
                          className='carousel-control-prev-icon'
                          aria-hidden='true'></span>
                                            <span className='visually-hidden'>Previous</span>
                                        </button>
                                        <button
                                            className='carousel-control-next'
                                            type='button'
                                            data-bs-target='#carouselExampleDark'
                                            data-bs-slide='next'>
                      <span
                          className='carousel-control-next-icon'
                          aria-hidden='true'></span>
                                            <span className='visually-hidden'>Next</span>
                                        </button>
                                    </div>
                                    <div className='catalogPageSubCarousel d-flex justify-content-between mt-3'>
                                        <div
                                            className='catalogPageImg '
                                            data-bs-target='#carouselExampleDark'
                                            data-bs-slide-to='0'
                                            aria-label='Slide 1'>
                                            <img
                                                className='img-thumbnail'
                                                src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_1620416-800x800.webp'
                                                alt=''
                                            />
                                        </div>
                                        <div
                                            className='catalogPageImg'
                                            data-bs-target='#carouselExampleDark'
                                            data-bs-slide-to='1'
                                            aria-label='Slide 2'>
                                            <img
                                                className='img-thumbnail'
                                                src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_162113-800x800.webp'
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='catalogPageProducts__content__right'>
                        <div className='catalogPageProducts__content__right__top'>
                            <div className='catalogPageProducts__content__right__top__title'>
                                Спасательный жилет BRP Men's Airflow PFD
                            </div>
                            <p>Код товара: 366666-2 </p>
                            <div className='mb-3 catalogInfo'>
                <span>
                  <HandySvg src={heart} width='24' height='22'/>
                </span>
                                <span onClick={() => addToCart()}>
                                    <HandySvg src={cart} width='30' height='23'/>
                                </span>
                                <span>
                  Наличии: <span>4</span>
                </span>
                            </div>
                            <span></span>
                        </div>
                        <div className='catalogPageProducts__content__wrapper'>
                            <div className='catalogPageProducts__content__left__card__bottom'>
                                <p>35 000 сом</p>
                                <p>24 000 сом</p>
                            </div>
                            <div
                                className='catalogPagePopular__catalogs__cards__card__quantity justify-content-start mb-0'>
                                <button type='button' className='btn btn-info' onClick={() => setCount(count - 1)}>
                                    -
                                </button>
                                <input
                                    type='number'
                                    className='form-control form-control-color'
                                    value={count}
                                />
                                <button type='button' className='btn btn-info' onClick={() => setCount(count + 1)}>
                                    +
                                </button>
                            </div>
                            <div className='catalogPageProducts__content__right__bottom'>
                                <button className='catalogPageProducts__content__right__bottom__btn'
                                        onClick={() => addToCart()}>
                                    купить
                                </button>
                            </div>
                        </div>
                        <div className='catalogPageProducts__content__right__mid'>
                            <h2>Описание</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Aperiam assumenda autem blanditiis consequuntur dolorum esse,
                                eum fuga hic illum ipsam iure iusto laboriosam libero magnam
                                nesciunt perferendis provident quibusdam quis quos repellendus
                                sed sit tempora? Aut eos quae sed velit? Debitis delectus libero
                                natus nesciunt nostrum numquam similique tempore vero!
                            </p>
                        </div>
                    </div>
                    <Toaster/>
                </div>
            </div>
        </>
    );
};

export default CatalogPageProducts;
