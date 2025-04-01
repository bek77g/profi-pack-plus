import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import Loading from '../../components/Loading';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import './ProfilePage.scss';

const OrderHistory = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { user } = useContext(CustomContext);
	const [showModal, setShowModal] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState(null);

	useEffect(() => {
		if (user) {
			fetchOrders();
		}
	}, [user]);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get('/api/orders/history');
			setOrders(data);
			setError(null);
		} catch (err) {
			console.error('Error fetching order history:', err);
			setError('Не удалось загрузить историю заказов');
		} finally {
			setLoading(false);
		}
	};

	const getStatusText = status => {
		switch (status) {
			case 'pending':
				return 'В обработке';
			case 'processing':
				return 'Комплектуется';
			case 'shipped':
				return 'Отправлен';
			case 'delivered':
				return 'Доставлен';
			case 'completed':
				return 'Выполнен';
			case 'cancelled':
				return 'Отменен';
			default:
				return 'Неизвестно';
		}
	};

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const handleRepeatOrderClick = id => {
		setSelectedOrderId(id);
		setShowModal(true);
	};

	const repeatOrder = async () => {
		if (!selectedOrderId) return;

		try {
			setLoading(true);
			await axios.post(`/api/orders/${selectedOrderId}/repeat`);
			// Close modal
			setShowModal(false);
			// Redirect to cart after repeating order
			window.location.href = '/cart';
		} catch (err) {
			console.error('Error repeating order:', err);
			alert('Не удалось повторить заказ');
		} finally {
			setLoading(false);
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedOrderId(null);
	};

	return (
		<>
			<SEO
				SeoTitle='ProfiPackPlus - История заказов'
				SeoDescription='История заказов в магазине Profipackplus'
			/>
			<div className='profilePage'>
				<div className='profilePage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>
						<Link to='/profile'>
							Личный кабинет <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>История заказов</span>
				</div>

				<div className='orderHistory'>
					<h2 className='mb-4'>История заказов</h2>

					{loading ? (
						<Loading />
					) : error ? (
						<div className='profilePage__error'>{error}</div>
					) : orders.length === 0 ? (
						<div className='orderHistory__empty'>
							<p>У вас еще нет заказов</p>
						</div>
					) : (
						<div className='orderHistory__list'>
							{orders.map(order => (
								<div key={order.id} className='orderHistory__item'>
									<div className='orderHistory__header'>
										<div className='orderHistory__info'>
											<div className='orderHistory__number'>
												Заказ №{order.id}
											</div>
											<div className='orderHistory__date'>
												от {formatDate(order.createdAt)}
											</div>
										</div>
										<div
											className={`orderHistory__status orderHistory__status--${order.status}`}>
											{getStatusText(order.status)}
										</div>
									</div>

									<div className='orderHistory__products'>
										{order.items.map(item => (
											<div key={item.id} className='orderHistory__product'>
												<div className='orderHistory__product-image'>
													{item.Gallery && item.Gallery.length > 0 && (
														<img
															src={`${axios.defaults.baseURL}${
																item.Gallery[0].formats?.thumbnail?.url ||
																item.Gallery[0].url
															}`}
															alt={item.Title}
														/>
													)}
												</div>
												<div className='orderHistory__product-info'>
													<div className='orderHistory__product-title'>
														{item.Title}
													</div>
													<div className='orderHistory__product-article'>
														Артикул: {item.Article}
													</div>
													<div className='orderHistory__product-price'>
														{item.Price} сом × {item.quantity} {item.CountType}{' '}
														= {item.Price * item.quantity} сом
													</div>
												</div>
											</div>
										))}
									</div>

									<div className='orderHistory__footer'>
										<div className='orderHistory__total'>
											<div className='orderHistory__subtotal'>
												Сумма заказа: <b>{order.totalPrice} сом</b>
											</div>
											<div className='orderHistory__shipping'>
												Доставка: <b>{order.shippingPrice} сом</b>
											</div>
											<div className='orderHistory__grand-total'>
												Итого:{' '}
												<b>{order.totalPrice + order.shippingPrice} сом</b>
											</div>
										</div>

										<div className='orderHistory__actions'>
											<button
												className='btn btn-primary'
												onClick={() => handleRepeatOrderClick(order.id)}>
												Повторить заказ
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					<div className='profilePage__back-btn'>
						<Link to='/profile' className='btn btn-secondary'>
							Вернуться назад
						</Link>
					</div>
				</div>
			</div>

			{/* Confirmation Modal */}
			<Modal show={showModal} onHide={handleCloseModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Подтверждение повторного заказа</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Вы уверены, что хотите повторить заказ? Заказ будет сразу сохранён и
					объявлен
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseModal}>
						Отмена
					</Button>
					<Button variant='primary' onClick={repeatOrder}>
						Да, повторить заказ
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default OrderHistory;
