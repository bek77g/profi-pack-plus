import React from 'react';
import logo from "../../assets/img/logo.jpg";
import favourite from "../../assets/icons/favourite.svg";
import cart from "../../assets/icons/cart.svg";


const Header = () => {
    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__nav__bar">
                    <li className="header__nav__bar__item">О нас</li>
                    <li className="header__nav__bar__item">Сотрудничество</li>
                    <li className="header__nav__bar__item">
                        <img src={logo} alt="logo" className="header__img"/>
                    </li>
                    <li className="header__nav__bar__item">Доставка и оплата</li>
                    <li className="header__nav__bar__item">Контакты</li>
                    <li className="header__nav__bar__item">
                        <img src={favourite} alt="favourite"/>
                    </li>
                    <li className="header__nav__bar__item">
                        <img src={cart} alt="cart"/>
                        <span className="header__cart">1</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
