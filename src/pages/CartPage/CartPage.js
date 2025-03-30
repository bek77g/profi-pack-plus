import CartPageEmpty from './components/CartPageEmpty';
import CartPageProducts from './components/CartPageProducts';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import arr from '../../assets/icons/arr.svg';
import './CartPage.scss';

const CartPage = () => {
	const { user, cart, setAuthModalOpen } = useContext(CustomContext);

	const handleLogin = () => {
		setAuthModalOpen(true);
	};

	return (
		<>
			<SEO
				SeoTitle='ProfiPackPlus - Корзина'
				SeoDescription='Ваша корзина товаров в магазине Profipackplus'
			/>
			<div className='cartPage'>
				<div className='cartPage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>Корзина</span>
					<h2>Корзина</h2>
				</div>
				
				{user ? (
					cart && cart.length ? <CartPageProducts /> : <CartPageEmpty />
				) : (
					<div className='cartPage__not-logged-in'>
						<div className='cartPage__section'>
							<h3>Вы не авторизованы</h3>
							<p>Для доступа к вашей корзине необходимо войти в систему.</p>
							<button 
								className='btn btn-primary cartPage__login-btn' 
								onClick={handleLogin}
							>
								ВОЙТИ В АККАУНТ
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CartPage;
