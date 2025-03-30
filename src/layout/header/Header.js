import { HandySvg } from 'handy-svg';
import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cartImg from '../../assets/icons/cart.svg';
import favourite from '../../assets/icons/favourite.svg';
import userIcon from '../../assets/icons/user.svg';
import logo from '../../assets/img/logo.jpg';
import { CustomContext } from '../../hoc/mainContentContext';

const Header = () => {
	const { cart, setNav, nav } = useContext(CustomContext);
	const { pathname } = useLocation();
	const setActive = !nav ? 'open' : 'close';

	useEffect(() => {
		setNav(false);
	}, [pathname, setNav]);

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
						<li className='header__nav__bar__item header__special header__special-user header__mobile-hide'>
							<Link to='/profile'>
								<HandySvg src={userIcon} width='30' height='30' alt='profile' />
							</Link>
						</li>
						<li className='header__nav__bar__item header__special header__special-heart header__mobile-hide'>
							<Link to='/favourite'>
								<HandySvg src={favourite} width='30' height='30' alt='cart' />
							</Link>
						</li>
						<li className='header__nav__bar__item header__nav__bar__item__last header__special header__special-cart header__mobile-hide'>
							<Link to='/cart'>
								<HandySvg src={cartImg} width='30' height='30' alt='cart' />
								{cart.length !== 0 && (
									<span className='header__cart'>{cart.length}</span>
								)}
							</Link>
						</li>
					</ul>
					{/* <div
            onClick={() => setNav(!nav)}
            className={`header__burger ${setActive}`}>
            <span></span>
            <span></span>
            <span></span>
          </div> */}
				</nav>
			</header>
		</>
	);
};

export default Header;
