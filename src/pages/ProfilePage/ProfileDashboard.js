import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cart_icon from '../../assets/icons/cart.svg';
import favourite_icon from '../../assets/icons/favourite.svg';
import user_icon from '../../assets/icons/user.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import './ProfilePage.scss';

const ProfileDashboard = () => {
	const { user, logout, cart, favorite } = useContext(CustomContext);
	const [orderCount, setOrderCount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Fetch order count for the dashboard
		const fetchOrderCount = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get('/api/orders/history');
				setOrderCount(data.length);
			} catch (err) {
				console.error('Error fetching order history:', err);
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchOrderCount();
		}
	}, [user]);

	return (
		<div className='profileDashboard'>
			<div className='profileDashboard__user-info'>
				<div className='profileDashboard__avatar'>
					<img src={user_icon} alt='User' />
				</div>
				<div className='profileDashboard__details'>
					<h2>
						{user?.firstName || user?.organization?.[0]?.name || 'Пользователь'}
					</h2>
					<p>т. {user?.phoneNumber || 'Не указан'}</p>
					{user?.addresses?.map((addr, index) => (
						<p key={`address-${index}`}>
							{addr.street} {addr.building}
							{addr.apartment ? `, кв. ${addr.apartment}` : ''}
						</p>
					))}
				</div>
			</div>

			<div className='profileDashboard__cards'>
				<div className='profileDashboard__card'>
					<Link to='/profile/personal'>
						<div className='profileDashboard__card-icon'>
							<img src={user_icon} alt='Personal data' />
						</div>
						<div className='profileDashboard__card-content'>
							<h3>Личные данные</h3>
							<p>Управление личной информацией</p>
						</div>
					</Link>
				</div>

				<div className='profileDashboard__card'>
					<Link to='/profile/orders'>
						<div className='profileDashboard__card-icon'>
							<img src={cart_icon} alt='Orders' />
						</div>
						<div className='profileDashboard__card-content'>
							<h3>История заказов</h3>
							<p>Всего заказов: {loading ? '...' : orderCount}</p>
						</div>
					</Link>
				</div>

				<div className='profileDashboard__card'>
					<Link to='/favourite'>
						<div className='profileDashboard__card-icon'>
							<img src={favourite_icon} alt='Favorites' />
						</div>
						<div className='profileDashboard__card-content'>
							<h3>Избранное</h3>
							<p>Товаров в избранном: {favorite.length}</p>
						</div>
					</Link>
				</div>

				<div className='profileDashboard__card'>
					<Link to='/cart'>
						<div className='profileDashboard__card-icon'>
							<img src={cart_icon} alt='Cart' />
						</div>
						<div className='profileDashboard__card-content'>
							<h3>Корзина</h3>
							<p>В корзине: {cart.length} товаров</p>
						</div>
					</Link>
				</div>
				<div className='profileDashboard__card'>
					<Link to='/sale'>
						<div className='profileDashboard__card-icon'>
							<img src='' alt='Sale' />
						</div>
						<div className='profileDashboard__card-content'>
							<h3>Акции и распродажи</h3>
							<p>Все акции и распродажи</p>
						</div>
					</Link>
				</div>
			</div>

			<button
				className='btn btn-danger profileDashboard__logout'
				onClick={logout}>
				Выйти
			</button>
		</div>
	);
};

export default ProfileDashboard;
