import React from 'react';
import {Helmet} from 'react-helmet';
import arr from '../../../../assets/icons/arr.svg';
import {HandySvg} from "handy-svg";
import heart from '../../../../assets/icons/favourite.svg';
import cart from "../../../../assets/icons/cart.svg";

const CatalogPageProducts = () => {
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
                    <img src={arr} alt='' className="ps-2"/>
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

                                <div id="carouselExampleDark" className="carousel carousel-dark slide"
                                     data-bs-ride="carousel">

                                    <div className="carousel-inner catalogPageCarouselCard">
                                        <div className="carousel-inner">

                                            <div className="carousel-item active">
                                                <img className="img-thumbnail"
                                                     src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_1620416-800x800.webp'
                                                     alt=''
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img className="img-thumbnail"
                                                     src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_162113-800x800.webp'
                                                     alt=''
                                                />
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button"
                                                data-bs-target="#carouselExampleDark"
                                                data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button"
                                                data-bs-target="#carouselExampleDark"
                                                data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <div className="catalogPageSubCarousel d-flex justify-content-between mt-3">
                                        <div className="catalogPageImg ">
                                            <img className="img-thumbnail"
                                                 src='https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_1620416-800x800.webp'
                                                 alt=''
                                            />
                                        </div>
                                        <div className="catalogPageImg ">
                                            <img className="img-thumbnail"
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
                            <div className="mb-3 catalogInfo">
                                <span>
                                    <HandySvg src={heart} width="24" height="22"/>
                                </span>
                                <span>
                                    <HandySvg src={cart} width="30" height="23"/>
                                </span>
                                <span>
                                    Наличии: <span>4</span>
                                </span>
                            </div>
                            <span>

                            </span>
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
                        <div className='catalogPageProducts__content__left__card__bottom mb-5'>
                            <p>35 000 сом</p>
                            <p>24 000 сом</p>
                        </div>
                        <div className='catalogPagePopular__catalogs__cards__card__quantity justify-content-start mb-3'>
                            <button type='button' className='btn btn-info'>
                                -
                            </button>
                            <input
                                type='text'
                                className='form-control form-control-color'
                                defaultValue={1}
                            />
                            <button type='button' className='btn btn-info'>
                                +
                            </button>
                        </div>
                        <div className='catalogPageProducts__content__right__bottom'>
                            <button className='catalogPageProducts__content__right__bottom__btn'>
                                купить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CatalogPageProducts;
