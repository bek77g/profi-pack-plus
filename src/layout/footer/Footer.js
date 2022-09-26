import React from 'react';
import insta from '../../assets/icons/instagram.svg';
import vk from '../../assets/icons/vk.svg';
import facebook from '../../assets/icons/facebook.svg';
import youtube from '../../assets/icons/youtube.svg';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__content'>
                    <div className='footer__content__messages'>
                        <div className='footer__content__messages__title'>
                            Подпишитесь на нашу рассылку и узнавайте о акция быстрее
                        </div>
                        <div className='footer__content__messages__input'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="E-mail"/>
                                <button className="btn btn-outline-secondary" type="button"
                                        id="button-addon2">Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='footer__content__info'>
                        <ul className='footer__content__info__items'>
                            <li className='footer__content__info__items__item itemBold'>
                                Информация
                            </li>
                            <li className='footer__content__info__items__item'>О компании</li>
                            <li className='footer__content__info__items__item'>Контакты</li>
                            <li className='footer__content__info__items__item'>Магазины</li>
                        </ul>
                    </div>
                    <div className='footer__content__shop'>
                        <ul className='footer__content__shop__items'>
                            <li className='footer__content__shop__items__item itemBold'>
                                Интернет-магазин
                            </li>
                            <li className='footer__content__shop__items__item'>
                                Доставка и самовывоз
                            </li>
                            <li className='footer__content__shop__items__item'>Оплата</li>
                            <li className='footer__content__shop__items__item'>
                                Возрат и обмен
                            </li>
                        </ul>
                    </div>
                    <div className='footer__content__app'>
                        <ul className='footer__content__app__items'>
                            <li className='footer__content__app__items__item'>
                                <a href='/'>
                                    <img src={insta} alt='insta'/>
                                </a>
                            </li>
                            <li className='footer__content__app__items__item'>
                                <a href='/'>
                                    <img src={vk} alt='vk'/>
                                </a>
                            </li>
                            <li className='footer__content__app__items__item'>
                                <a href='/'>
                                    <img src={facebook} alt='facebook'/>
                                </a>
                            </li>
                            <li className='footer__content__app__items__item'>
                                <a href='/'>
                                    <img src={youtube} alt='youtube'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer__content__sub'>
                    <div className='footer__content__sub__item'>Договор оферты</div>
                    <div className='footer__content__sub__item__politics'>
                        Политика обработки персональных данных
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
