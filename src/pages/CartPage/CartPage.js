import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { CustomContext } from '../../hoc/mainContentContext';

const CartPage = () => {
	const { cart, user, setAuthModalOpen } = useContext(CustomContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			setAuthModalOpen(true);
		}
	}, [user, setAuthModalOpen]);

	const calculateTotal = () => {
		return cart.reduce((acc, rec) => acc + rec.price * rec.quantity, 0);
	};

	if (!user) {
		return null;
	}

	return (
		<section className='cart'>
			<div className='container'>
				<h2>Корзина</h2>
				{cart.length ? (
					<>
						<div className='cart__content'>
							{cart.map(item => (
								<CartItem key={item.id} item={item} />
							))}
						</div>
						<div className='cart__bottom'>
							<div className='cart__bottom-details'>
								<span>Всего товаров: {cart.length} шт.</span>
								<span>Сумма заказа: {calculateTotal()} сом</span>
							</div>
							<div className='cart__bottom-buttons'>
								<button
									className='button button--outline button--add go-back-btn'
									onClick={() => navigate(-1)}>
									<span>Вернуться назад</span>
								</button>
								<button className='button pay-btn'>
									<span>Оплатить сейчас</span>
								</button>
							</div>
						</div>
					</>
				) : (
					<div className='cart__empty'>
						<h2>
							Корзина пустая <span>😕</span>
						</h2>
						<p>
							Вероятней всего, вы не заказывали ещё товар.
							<br />
							Для того, чтобы заказать товар, перейди на главную страницу.
						</p>
						<button
							className='button button--black'
							onClick={() => navigate('/')}>
							<span>Вернуться назад</span>
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default CartPage;
