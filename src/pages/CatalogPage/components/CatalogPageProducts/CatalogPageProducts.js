import React from 'react';
import arr from "../../../../assets/icons/arr.svg";
import heart from "../../../../assets/icons/favourite.svg";

const CatalogPageProducts = () => {
    return (
        <div className="catalogPageProducts">
            <div className="catalogPageProducts__top">
                <span>Главная</span>
                <img src={arr} alt=""/>
                <span>Каталог</span>
                <img src={arr} alt=""/>
                <span>Спасательный жилет BRP Men's Airflow PFD</span>
            </div>
            <div className="catalogPageProducts__content">
                <div className="catalogPageProducts__content__left">
                    <div className="catalogPageProducts__content__left__card">
                        <div className="catalogPageProducts__content__left__card__top">
                            <span>Sale</span>
                        </div>
                        <div className="catalogPageProducts__content__left__card__mid">
                            <img
                                src="https://zvz.com.ua/image/cache/catalog/image/cache/catalog/pozicii/furnitura/spas_zhilet/20200803_1620416-800x800.webp"
                                alt=""/>
                        </div>
                        <div className="catalogPageProducts__content__left__card__bottom">
                            <p>35 000 сом</p>
                            <p>24 000 сом</p>
                        </div>
                    </div>
                </div>
                <div className="catalogPageProducts__content__right">
                    <div className="catalogPageProducts__content__right__top">
                        <div className="catalogPageProducts__content__right__top__title">
                            Спасательный жилет BRP Men's Airflow PFD
                        </div>
                        <p>Код товара: 366666-2 </p>
                        <p>
                            <img src={heart} alt=""/>
                        </p>
                    </div>
                    <div className="catalogPageProducts__content__right__mid">
                        <h2>Описание</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem blanditiis
                            consequuntur dolorum esse, eum fuga hic illum ipsam iure iusto laboriosam libero magnam
                            nesciunt perferendis provident quibusdam quis quos repellendus sed sit tempora? Aut eos quae
                            sed velit? Debitis delectus libero natus nesciunt nostrum numquam similique tempore
                            vero!</p>
                    </div>
                    <div className="catalogPageProducts__content__right__bottom">
                        <button className="catalogPageProducts__content__right__bottom__btn">
                            купить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogPageProducts;
