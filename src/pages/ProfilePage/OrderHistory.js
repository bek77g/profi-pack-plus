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
	const [showReceiptModal, setShowReceiptModal] = useState(false);
	const [receiptOrderId, setReceiptOrderId] = useState(null);

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
			console.error('Error fetching orders:', err);
			setError('Не удалось загрузить историю заказов');
		} finally {
			setLoading(false);
		}
	};

	// Format price to show only one decimal place if needed
	const formatPrice = price => {
		return Number(price).toFixed(1).replace(/\.0$/, '');
	};

	const formatDate = dateString => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleDateString('ru-RU', options);
	};

	const getStatusClass = status => {
		switch (status.toLowerCase()) {
			case 'pending':
				return 'orderHistory__status--pending';
			case 'processing':
				return 'orderHistory__status--processing';
			case 'completed':
				return 'orderHistory__status--completed';
			case 'cancelled':
				return 'orderHistory__status--cancelled';
			default:
				return '';
		}
	};

	// Get localized status text
	const getStatusText = status => {
		switch (status.toLowerCase()) {
			case 'pending':
				return 'В обработке';
			case 'processing':
				return 'Комплектуется';
			case 'completed':
				return 'Выполнен';
			case 'cancelled':
				return 'Отменен';
			default:
				return status;
		}
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

	const handleConfirmReceiptClick = id => {
		setReceiptOrderId(id);
		setShowReceiptModal(true);
	};

	const confirmOrderReceipt = async () => {
		if (!receiptOrderId) return;

		try {
			setLoading(true);
			// Mark the order as completed
			await axios.post(`/api/orders/${receiptOrderId}/complete`);
			// Update the order status in the local state
			setOrders(
				orders.map(order =>
					order.id === receiptOrderId
						? { ...order, status: 'completed' }
						: order
				)
			);
			// Close modal
			setShowReceiptModal(false);
			setReceiptOrderId(null);
		} catch (err) {
			console.error('Error confirming receipt:', err);
			alert('Не удалось подтвердить получение заказа');
		} finally {
			setLoading(false);
		}
	};

	const handleCloseReceiptModal = () => {
		setShowReceiptModal(false);
		setReceiptOrderId(null);
	};

	return (
		<>
			<SEO
				title='История заказов — Профиль'
				description='История ваших заказов в Профи-пак'
			/>
			<div className='container'>
				<div className='profilePage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>
						<Link to='/profile'>
							Профиль <img src={arr} alt='arr' />
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
							У вас пока нет заказов. <Link to='/catalog'>Начать покупки</Link>
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
											className={`orderHistory__status ${getStatusClass(
												order.status
											)}`}>
											{getStatusText(order.status)}
										</div>
									</div>

									<div className='orderHistory__address'>
										<strong>Адрес доставки:</strong>{' '}
										{order.address ? (
											<span>
												{order.address.street} {order.address.building}
												{order.address.apartment &&
													`, кв. ${order.address.apartment}`}
												{order.address.city && `, ${order.address.city}`}
											</span>
										) : (
											<span>Адрес не указан</span>
										)}
									</div>

									<div className='orderHistory__content'>
										<div className='orderHistory__products'>
											{order.items.map((item, index) => (
												<div
													key={`${order.id}-${index}`}
													className='orderHistory__product'>
													<div className='orderHistory__product-image'>
														{item.Gallery && item.Gallery.length > 0 ? (
															<img
																src={`${axios.defaults.baseURL}${
																	item.Gallery[0].formats?.thumbnail?.url ||
																	item.Gallery[0].url
																}`}
																alt={item.Title}
															/>
														) : (
															<img
																src='/placeholder.jpg'
																alt={item.Name || item.Title}
															/>
														)}
													</div>
													<div className='orderHistory__product-details'>
														<div className='orderHistory__product-name'>
															{item.Name || item.Title}
														</div>
														<div className='orderHistory__product-sku'>
															Артикул: {item.Article}
														</div>
														<div className='orderHistory__product-price'>
															{formatPrice(item.Price)} сом × {item.quantity}{' '}
															{item.CountType} ={' '}
															{formatPrice(item.Price * item.quantity)} сом
														</div>
													</div>
												</div>
											))}
										</div>

										<div className='orderHistory__footer'>
											<div className='orderHistory__totals'>
												<div className='orderHistory__subtotal'>
													Сумма: <b>{formatPrice(order.totalPrice)} сом</b>
												</div>
												<div className='orderHistory__shipping'>
													Доставка:{' '}
													<b>{formatPrice(order.shippingPrice)} сом</b>
												</div>
												<div className='orderHistory__grand-total'>
													Итого:{' '}
													<b>
														{formatPrice(
															order.totalPrice + order.shippingPrice
														)}{' '}
														сом
													</b>
												</div>
											</div>

											<div className='orderHistory__actions'>
												{order.status.toLowerCase() === 'pending' && (
													<button
														className='btn btn-success me-2'
														onClick={() => handleConfirmReceiptClick(order.id)}>
														Подтвердить получение
													</button>
												)}

												{['completed'].includes(order.status.toLowerCase()) && (
													<button
														className='btn btn-primary'
														onClick={() => handleRepeatOrderClick(order.id)}>
														Повторить заказ
													</button>
												)}
											</div>
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

			{/* Repeat Order Confirmation Modal */}
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

			{/* Confirm Receipt Modal */}
			<Modal show={showReceiptModal} onHide={handleCloseReceiptModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Подтверждение получения заказа</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Вы подтверждаете, что получили заказ? После подтверждения вы сможете
					повторить этот заказ.
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseReceiptModal}>
						Отмена
					</Button>
					<Button variant='success' onClick={confirmOrderReceipt}>
						Да, я получил заказ
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default OrderHistory;
