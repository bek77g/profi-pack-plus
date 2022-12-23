import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CustomContext } from '../../hoc/mainContentContext';
import logo from '../../assets/img/logo.jpg';
import favourite from '../../assets/icons/favourite.svg';
import cartImg from '../../assets/icons/cart.svg';
import { HandySvg } from 'handy-svg';

const Header = () => {
  const { cart, setNav, nav } = useContext(CustomContext);
  const { pathname } = useLocation();
  const setActive = !nav ? 'open' : 'close';

  useEffect(() => {
    setNav(false);
  }, [pathname]);

  return (
    <>
      <header className='header'>
        <nav className='header__nav'>
          <div className='header__blockImg'>
            <Link to='/'>
              <img src={logo} alt='logo' className='header__img' />
            </Link>
          </div>
          <ul className={`header__nav__bar `}>
            <li className='header__nav__bar__item header__nav__bar__item__prelast'>
              <Link to='/about'>О нас</Link>
            </li>
            <li className='header__nav__bar__item header__nav__bar__item__prelast'>
              <Link to='/partnership'>Сотрудничество</Link>
            </li>
            <li className='header__nav__bar__item header__nav__bar__item__prelast'>
              <Link to='/order'>Доставка</Link>
            </li>
            <li className='header__nav__bar__item header__nav__bar__item__prelast'>
              <Link to='/contacts'>Контакты</Link>
            </li>
            <li className='header__nav__bar__item header__special header__special-heart'>
              <Link to='/favourite'>
                <HandySvg src={favourite} width='30' height='30' alt='cart' />
              </Link>
            </li>
            <li className='header__nav__bar__item header__nav__bar__item__last header__special header__special-cart'>
              <Link to='/cart'>
                <HandySvg src={cartImg} width='30' height='30' alt='cart' />
                {cart.length !== 0 && (
                  <span className='header__cart'>{cart.length}</span>
                )}
              </Link>
            </li>
          </ul>
          <div
            onClick={() => setNav(!nav)}
            className={`header__burger ${setActive}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
