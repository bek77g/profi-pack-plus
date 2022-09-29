import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.jpg';
import favourite from '../../assets/icons/favourite.svg';
import cart from '../../assets/icons/cart.svg';
import { HandySvg } from 'handy-svg';
import HeaderMobile from '../header-mobile/HeaderMobile';

const Header = () => {
  const [nav, setNav] = useState(true);
  const active = nav ? 'left' : '';
  const setActive = nav ? 'open' : 'close';
  const width = window.innerWidth;

  return (
    <>
      {/*<HeaderMobile/>*/}
      <header className='header'>
        <nav className='header__nav'>
          <div className='header__blockImg'>
            <Link to='/'>
              <img src={logo} alt='logo' className='header__img' />
            </Link>
          </div>
          <ul className={`header__nav__bar ${active}`}>
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
            <div className='header__info'>
              <li className='header__nav__bar__item header__special'>
                <Link to='/favourite'>
                  <HandySvg src={favourite} width='30' height='23' alt='cart' />
                </Link>
              </li>
              <li className='header__nav__bar__item header__nav__bar__item__last header__special'>
                <Link to='/cart'>
                  <HandySvg src={cart} width='30' height='23' alt='cart' />
                  <span className='header__cart'>1</span>
                </Link>
              </li>
            </div>
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
