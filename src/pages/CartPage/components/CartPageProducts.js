import axios from 'axios';
import { HandySvg } from 'handy-svg';
import { useContext, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import arr from '../../../assets/icons/arr.svg';
import remove from '../../../assets/icons/remove.svg';
import { CustomContext } from '../../../hoc/mainContentContext';
import SEO from '../../../hoc/SEO';
import CartPageEmpty from './CartPageEmpty';

const CartPageProducts = () => {
	const { baseUrl, cart, editCart, removeCart, isCheckout, setIsCheckout } =
		useContext(CustomContext);

	console.log({ cart });

	const removeItem = id => {
		removeCart(id);
		toast.success('Товар удалён из корзины');
	};

	useEffect(() => {
		setIsCheckout(true);
		// Cleanup function
		return () => {
			setIsCheckout(false);
		};
	}, [setIsCheckout]);

	let totalPrice = cart.reduce(
		(acc, rec) => (acc += rec.Price * rec.quantity),
		0
	);
	let totalQuantity = cart.reduce((acc, rec) => (acc += rec.quantity), 0);

	return (
		<>
			<SEO
				SeoTitle='ProfiPackPlus - Корзина'
				SeoDescription='Ваша корзина в магазине Profipackplus'
			/>
			<div className='checkoutPage'>
				<div className='catalogPage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>Корзина</span>
					<h2>Корзина</h2>
				</div>
				<section className='h-100 cartPage'>
					<div className='container py-5 h-100'>
						<div className='row d-flex justify-content-center align-items-center h-100'>
							<div className='col-12'>
								<div
									className='card card-registration card-registration-2'
									style={{ borderRadius: '15px' }}>
									{cart.length >= 1 ? (
										<div className='card-body p-0'>
											<div className='row g-0'>
												<div className='col-lg-9'>
													<div className='p-5'>
														<div className='d-flex justify-content-between align-items-center mb-5'>
															<h2 className='fw-bold mb-0 text-black'>
																Корзина товаров:
															</h2>
														</div>
														<hr className='my-4' />
														{cart.length >= 1
															? cart.map(
																	({
																		id,
																		Title,
																		sub_catalog,
																		Price,
																		Gallery,
																		quantity,
																		MinCount,
																		Availability,
																	}) => {
																		return (
																			<div
																				key={id}
																				className={`row mb-4 d-flex justify-content-between align-items-center ${
																					!Availability
																						? 'cart-item-unavailable'
																						: ''
																				}`}>
																				<div className='col-md-2 col-lg-2 col-xl-2 cartImg text-center'>
																					<img
																						src={`${baseUrl}${Gallery[0].url}`}
																						className={`img-fluid rounded-3 ${
																							!Availability
																								? 'cart-item-unavailable-img'
																								: ''
																						}`}
																						alt='Cotton T-shirt'
																					/>
																				</div>
																				<div className='col-md-3 col-lg-3 col-xl-3 cartPageText'>
																					<h6 className='text-muted'>
																						{sub_catalog?.Title}
																					</h6>
																					<h6
																						className={`mb-0 ${
																							!Availability
																								? 'text-muted'
																								: 'text-black'
																						}`}>
																						{Title}
																					</h6>
																					{!Availability && (
																						<small className='text-danger fw-bold'>
																							Товара нет в наличии
																						</small>
																					)}
																				</div>
																				<div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
																					<div className='catalogPagePopular__catalogs__cards__card__quantity pt-4'>
																						<button
																							type='button'
																							className={`btn ${
																								!Availability
																									? 'btn-secondary'
																									: 'btn-info'
																							}`}
																							disabled={!Availability}
																							onClick={() => {
																								console.log({
																									item: cart.find(
																										item => item.id === id
																									),
																								});

																								Availability &&
																									editCart(
																										id,
																										quantity - MinCount
																									);
																							}}>
																							-
																						</button>
																						<input
																							type='text'
																							onKeyPress={e =>
																								!/[0-9]/.test(e.key) &&
																								e.preventDefault()
																							}
																							className={`form-control form-control-color ${
																								!Availability
																									? 'cart-item-unavailable-input'
																									: ''
																							}`}
																							value={quantity}
																							readOnly
																						/>
																						<button
																							type='button'
																							className={`btn ${
																								!Availability
																									? 'btn-secondary'
																									: 'btn-info'
																							}`}
																							disabled={!Availability}
																							onClick={() =>
																								Availability &&
																								editCart(
																									id,
																									quantity + MinCount
																								)
																							}>
																							+
																						</button>
																					</div>
																				</div>

																				<div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText'>
																					<h6 className='mb-0'>
																						{(Price * quantity).toFixed(2)} сом
																					</h6>
																				</div>

																				<div className='col-md-1 col-lg-1 col-xl-1 text-end cartPageText cartRemove'>
																					<span onClick={() => removeItem(id)}>
																						<HandySvg
																							src={remove}
																							width='13'
																							height='15'
																						/>
																					</span>
																				</div>
																			</div>
																		);
																	}
															  )
															: 'Корзина пуста'}

														<div className='pt-5'>
															<div className='column cartPageBtn'>
																<Link to='/'>
																	<button
																		type='button'
																		className='btn btn-primary'>
																		Назад в каталог
																	</button>
																</Link>
															</div>
														</div>
													</div>
												</div>

												<div className='col-lg-3 bg-grey d-flex align-items-center justify-content-center'>
													<div className='p-5'>
														<h3 className='fw-bold mb-5 mt-2 pt-1 text-center'>
															Заказ
														</h3>
														<hr className='my-4' />

														<div className='d-flex justify-content-between mb-4'>
															<h5 className=''>Количество: </h5>
															<h5>{totalQuantity}</h5>
														</div>

														<hr className='my-4' />

														<div className='text-center mb-5'>
															<h5 className=''>Итого: </h5>
															<h4>
																<b>{totalPrice.toFixed(2)} сом</b>
															</h4>
														</div>
														{!isCheckout && (
															<div className='d-flex justify-content-center'>
																<div className='column'>
																	<Link to='#checkout'>
																		<button
																			onClick={() => {
																				if (totalPrice.toFixed(0) < 3000) {
																					toast.error(
																						'Для оформления заказа необходимо набрать товаров на сумму от 3000 сом'
																					);
																				} else {
																					setIsCheckout(true);
																				}
																			}}
																			type='button'
																			className={`btn ${
																				totalPrice.toFixed(0) < 3000
																					? 'btn-outline-danger'
																					: 'btn-outline-primary'
																			}`}>
																			Оформить заказ
																		</button>
																	</Link>
																</div>
															</div>
														)}
														<Toaster position='bottom-center' />
													</div>
												</div>
											</div>
										</div>
									) : (
										<CartPageEmpty />
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
				{isCheckout && <CheckoutPage cart={cart} totalPrice={totalPrice} />}
			</div>
		</>
	);
};

export default CartPageProducts;

const CheckoutPage = ({ cart, totalPrice }) => {
	const { removeCart } = useContext(CustomContext);
	const {
		shippingPrice,
		resetCart,
		user: personalInfo,
	} = useContext(CustomContext);
	const [submitBtn, setSubmitBtn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [useOrganization, setUseOrganization] = useState(false);

	// Проверка минимальной суммы заказа
	const isMinimumOrderMet = totalPrice >= 3000;
	const hasNotAvailableItems = cart.some(item => !item.Availability);

	const [userData, setUserData] = useState({
		items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
		totalPrice: totalPrice,
		shippingPrice: shippingPrice,
		shippingType: '',
		comment: '',
		address: '',
		organization: '',
	});

	useEffect(() => {
		let localUser = localStorage.getItem('user');
		if (localStorage.getItem('user')) {
			setUserData(prevState => ({ ...prevState, ...JSON.parse(localUser) }));
		}
	}, []);

	const { shippingType, comment, address } = userData;

	const clearNotAvailableItems = () => {
		const notAvailableItems = cart.filter(item => !item.Availability);
		notAvailableItems.forEach(item => removeCart(item.id));
		toast.success('Недоступные товары были удалены из корзины');
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const orderPostHandler = async () => {
		setLoading(true);
		try {
			const orderData = {
				items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
				totalPrice: totalPrice,
				shippingPrice: shippingPrice,
				shippingType: userData.shippingType,
				comment: userData.comment,
			};

			// Only add address and organization if they're selected
			if (userData.address) {
				orderData.address = Number(userData.address);
			}

			if (useOrganization) {
				orderData.organization = Number(personalInfo.organization.id);
			}

			console.log({ userData, orderData });

			const response = await axios.post('api/orders', orderData);

			if (response.status === 200 && response.data.id > 0) {
				setSubmitBtn(true);
				setLoading(false);
				resetCart();
				localStorage.setItem(
					'user',
					JSON.stringify({
						address: userData.address,
						organization: userData.organization,
					})
				);
				document.getElementById('order-form').reset();
				toast.success('Заказ успешно отправлен');
			} else {
				toast.error(
					'Что-то пошло не так после отправки заказа. Попробуйте ещё раз.'
				);
			}
		} catch (err) {
			toast.error(
				err.response.data.error.message ||
					'Что-то пошло не так, попробуйте ещё раз.'
			);
		} finally {
			setLoading(false);
		}
	};

	const createUserHandler = event => {
		let invalidStyle = 'border: 1px solid #dc3545';
		let validStyle = 'border: 1px solid #198754;';
		event.preventDefault();

		// Проверка минимальной суммы заказа (3000 сом)
		if (totalPrice < 3000) {
			toast.error(
				'Для оформления заказа необходимо набрать товаров на сумму от 3000 сом'
			);
			return;
		}

		if (address.trim().length === 0 || shippingType.trim().length === 0) {
			if (address.trim().length === 0) {
				toast.error('Вы не выбрали адрес!');
				event.target.address.style.cssText = invalidStyle;
			} else event.target.address.style.cssText = validStyle;

			if (shippingType.trim().length === 0) {
				toast.error('Вы не выбрали способ доставки!');
				event.target.shippingType.style.cssText = invalidStyle;
			} else event.target.shippingType.style.cssText = validStyle;
		} else {
			orderPostHandler();
		}
	};

	return (
		<section className='checkoutForm' id='checkout'>
			<div className='container'>
				<div className='row'>
					<div className='col-12 mt-4'>
						<div className='box'>
							<h2>Оформление заказа</h2>

							{/* Предупреждение о минимальной сумме заказа */}
							{!isMinimumOrderMet && (
								<div className='alert alert-warning mt-3' role='alert'>
									<strong>Внимание!</strong> Для оформления заказа необходимо
									набрать товаров на сумму от 3000 сом. Ваша текущая сумма:{' '}
									{totalPrice.toFixed(2)} сом.
								</div>
							)}
							{hasNotAvailableItems && (
								<div className='alert alert-warning mt-3' role='alert'>
									<strong>Внимание!</strong> Некоторые товары в корзине
									отсутствуют в наличии. Нельзя оформить заказ
									<br />
									<button
										className='btn btn-primary mt-3'
										onClick={clearNotAvailableItems}>
										Удалить недоступные товары
									</button>
								</div>
							)}

							{submitBtn ? (
								<div className='container' style={{ textAlign: 'center' }}>
									<h2>Заказ успешно отправлен</h2>
									<div class='success-animation'>
										<svg
											class='checkmark'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 52 52'>
											<circle
												class='checkmark__circle'
												cx='26'
												cy='26'
												r='25'
												fill='none'
											/>
											<path
												class='checkmark__check'
												fill='none'
												d='M14.1 27.2l7.1 7.2 16.7-16.8'
											/>
										</svg>
									</div>
								</div>
							) : (
								<form id='order-form' action='' onSubmit={createUserHandler}>
									<div className='contacts__content__left'>
										<div className='contacts__content__left__Address mb-3'>
											<label htmlFor='address' className='form-label'>
												Адрес доставки
											</label>
											{personalInfo &&
											personalInfo.addresses &&
											personalInfo.addresses.length > 0 ? (
												<select
													className='form-select'
													id='address'
													name='address'
													value={address}
													onChange={handleChange}>
													<option disabled value=''>
														Выбрать адрес...
													</option>
													{personalInfo.addresses.map(addr => (
														<option key={addr.id} value={addr.id}>
															{addr.title} - {addr.street}, {addr.building}
															{addr.apartment ? `, кв. ${addr.apartment}` : ''}
														</option>
													))}
												</select>
											) : (
												<div className='mt-2'>
													<Link
														to='/profile#address-form'
														className='btn btn-outline-secondary btn-sm'>
														Добавить адрес доставки
													</Link>
												</div>
											)}
										</div>
										<div className='contacts__content__left__organization mb-3'>
											<label className='form-label'>Организация</label>
											{personalInfo && personalInfo.organization ? (
												<div>
													<div className='form-check mb-2'>
														<input
															className='form-check-input'
															type='checkbox'
															id='useOrganization'
															checked={useOrganization}
															onChange={e =>
																setUseOrganization(e.target.checked)
															}
														/>
														<label
															className='form-check-label'
															htmlFor='useOrganization'>
															Оформить на организацию
														</label>
													</div>
													{useOrganization && (
														<div className='card p-2 bg-light'>
															<div className='mb-0'>
																<strong>
																	{personalInfo.organization.name}
																</strong>
															</div>
															<div className='text-muted small'>
																ИНН: {personalInfo.organization.inn}
															</div>
														</div>
													)}
												</div>
											) : (
												<div className='mt-2'>
													<div className='alert alert-light'>
														У вас нет организации. Добавьте организацию в
														профиле, чтобы иметь возможность оформить заказ на
														организацию.
													</div>
													<Link
														to='/profile#org-form'
														className='btn btn-outline-secondary btn-sm'>
														Добавить организацию
													</Link>
												</div>
											)}
										</div>
										<div className='contacts__content__left__order mb-3'>
											<label htmlFor='shippingType' className='form-label'>
												Способ доставки
											</label>
											<select
												className='form-select'
												id='shippingType'
												name='shippingType'
												value={shippingType}
												onChange={handleChange}>
												<option disabled value=''>
													Выбрать...
												</option>
												<option value='delivery'>
													Доставка курьером ({shippingPrice})
												</option>
												<option value='pickup'>Самовывоз</option>
											</select>
										</div>
										<div className='contacts__content__left__message'>
											<label htmlFor='comment' className='form-label mb-2'>
												Комментарии к заказу:
											</label>
											<textarea
												className='form-control'
												id='comment'
												placeholder='Комментарии к заказу'
												rows='3'
												name='comment'
												value={comment}
												onChange={handleChange}></textarea>
										</div>
									</div>
									<div className='shopping-cart-footer mt-5'>
										<div className='column'></div>
										<div className='column'>
											<button
												disabled={
													loading ||
													submitBtn ||
													!isMinimumOrderMet ||
													hasNotAvailableItems
												}
												type='submit'
												className={`btn btn-outline-${
													!loading ? 'primary' : 'secondary'
												}`}>
												Отправить заказ
											</button>
										</div>
									</div>
								</form>
							)}
							<Toaster position='bottom-center' />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
