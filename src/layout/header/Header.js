import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.jpg';
import favourite from '../../assets/icons/favourite.svg';
import cart from '../../assets/icons/cart.svg';
import {HandySvg} from "handy-svg";

const Header = () => {
    return (
        <header className='header'>
            <nav className='header__nav'>
                <h1>
                    <Link to='/'>
                        <img src={logo} alt='logo' className='header__img'/>
                    </Link>
                </h1>
                <ul className='header__nav__bar'>
                    <li className='header__nav__bar__item'>
                        <Link to="/about">
                            О нас
                        </Link>
                    </li>
                    <li className='header__nav__bar__item'>
                        <Link to="/partnership">
                            Сотрудничество
                        </Link>
                    </li>
                    <li className='header__nav__bar__item'>
                        <Link to="/order">
                            Доставка
                        </Link>
                    </li>
                    <li className='header__nav__bar__item'>
                        <Link to="/contacts">
                            Контакты
                        </Link>
                    </li>
                </ul>
                <ul className='header__nav__bar-right'>
                    <li className='header__nav__bar__item'>
                        <img src={favourite} alt='favourite'/>
                    </li>
                    <li className='header__nav__bar__item'>
                        <Link to="/cart">
                            <HandySvg src={cart} width="30" height="23" alt='cart'/>
                            <span className='header__cart'>1</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
