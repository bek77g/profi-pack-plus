import React from 'react';
import insta from "../../assets/icons/instagram.svg";
import vk from "../../assets/icons/vk.svg";
import facebook from "../../assets/icons/facebook.svg";
import youtube from "../../assets/icons/youtube.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__content__messages">
                        <div className="footer__content__messages__title">
                            Подпишитесь на нашу рассылку
                            и узнавайте о акция быстрее
                        </div>
                        <div className="footer__content__messages__input">
                            <input type="text" placeholder="Введите ваш e-mail:"/>
                            <button className="footer__content__messages__btn">Отправить</button>
                        </div>
                    </div>
                    <div className="footer__content__info">
                        <ul className="footer__content__info__items">
                            <li className="footer__content__info__items__item itemBold">Информация</li>
                            <li className="footer__content__info__items__item">О компании</li>
                            <li className="footer__content__info__items__item">Контакты</li>
                            <li className="footer__content__info__items__item">Акции</li>
                            <li className="footer__content__info__items__item">Магазины</li>
                        </ul>
                    </div>
                    <div className="footer__content__shop">
                        <ul className="footer__content__shop__items">
                            <li className="footer__content__shop__items__item itemBold">Интернет-магазин</li>
                            <li className="footer__content__shop__items__item">Доставка и самовывоз</li>
                            <li className="footer__content__shop__items__item">Оплата</li>
                            <li className="footer__content__shop__items__item">Возрат и обмен</li>
                            <li className="footer__content__shop__items__item">Новости</li>
                        </ul>
                    </div>
                    <div className="footer__content__app">
                        <ul className="footer__content__app__items">
                            <li className="footer__content__app__items__item">
                                <img src={insta} alt="insta"/>
                            </li>
                            <li className="footer__content__app__items__item">
                                <img src={vk} alt="vk"/>
                            </li>
                            <li className="footer__content__app__items__item">
                                <img src={facebook} alt="facebook"/>
                            </li>
                            <li className="footer__content__app__items__item">
                                <img src={youtube} alt="youtube"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer__content__sub">
                    <div className="footer__content__sub__item">
                        Договор оферты
                    </div>
                    <div className="footer__content__sub__item__politics">
                        Политика обработки персональных данных
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;