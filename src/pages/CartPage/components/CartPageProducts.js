import axios from 'axios';
import { HandySvg } from 'handy-svg';
import { useContext, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { toast, Toaster } from 'react-hot-toast';
import ReactInputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import arr from '../../../assets/icons/arr.svg';
import remove from '../../../assets/icons/remove.svg';
import { CustomContext } from '../../../hoc/mainContentContext';
import SEO from '../../../hoc/SEO';
import CartPageEmpty from './CartPageEmpty';

const CartPageProducts = () => {
	const { baseUrl, cart, editCart, removeCart } = useContext(CustomContext);
	const [checkout, setCheckout] = useState(false);

	const removeItem = id => {
		removeCart(id);
		toast.success('Товар удалён из корзины');
	};

	useEffect(() => setCheckout(false), [cart, editCart, removeCart]);

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
																	}) => {
																		return (
																			<div
																				key={id}
																				className='row mb-4 d-flex justify-content-between align-items-center'>
																				<div className='col-md-2 col-lg-2 col-xl-2 cartImg text-center'>
																					<img
																						src={`${baseUrl}${Gallery[0].url}`}
																						className='img-fluid rounded-3'
																						alt='Cotton T-shirt'
																					/>
																				</div>
																				<div className='col-md-3 col-lg-3 col-xl-3 cartPageText'>
																					<h6 className='text-muted'>
																						{sub_catalog.Title}
																					</h6>
																					<h6 className='text-black mb-0'>
																						{Title}
																					</h6>
																				</div>
																				<div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
																					<div className='catalogPagePopular__catalogs__cards__card__quantity pt-4'>
																						<button
																							type='button'
																							className='btn btn-info'
																							onClick={() =>
																								editCart(
																									id,
																									quantity - MinCount
																								)
																							}>
																							-
																						</button>
																						<input
																							type='text'
																							onKeyPress={e =>
																								!/[0-9]/.test(e.key) &&
																								e.preventDefault()
																							}
																							className='form-control form-control-color'
																							value={quantity}
																						/>
																						<button
																							type='button'
																							className='btn btn-info'
																							onClick={() =>
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
														{!checkout && (
															<div className='d-flex justify-content-center'>
																<div className='column'>
																	<HashLink to='#checkout'>
																		<button
																			onClick={() => {
																				if (totalPrice.toFixed(0) < 3000) {
																					toast.error(
																						'Для оформления заказа необходимо набрать товаров на сумму от 3000 сом'
																					);
																				} else {
																					setCheckout(true);
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
																	</HashLink>
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
				{checkout && (
					<CheckoutPage
						cart={cart}
						totalPrice={totalPrice}
						totalQuantity={totalQuantity}
					/>
				)}
			</div>
		</>
	);
};

export default CartPageProducts;

const CheckoutPage = ({ cart, totalPrice }) => {
	const { baseUrl, shippingPrice } = useContext(CustomContext);
	const [submitBtn, setSubmitBtn] = useState(false);
	const [loading, setLoading] = useState(false);
	let randomId = Date.now().valueOf().toString().replace('.', 7);

	const ProductsTableLoop = () => {
		return (
			<table>
				<thead>
					<tr
						style={{
							marginTop: '15px',
							borderBottomColor: '#e5e5e5',
							borderBottomStyle: 'solid',
							borderBottomWidth: '1px',
							borderCollapse: 'separate',
						}}>
						<td>Количество</td>
						<td>Название</td>
						<td>Цена</td>
					</tr>
				</thead>
				<tbody>
					{cart.map(({ Title, Price, Gallery, quantity }) => {
						return (
							<tr
								style={{
									borderBottomColor: '#e5e5e5',
									borderBottomStyle: 'solid',
									borderBottomWidth: '1px',
									borderCollapse: 'separate',
								}}>
								<td style={{ padding: '20px 0', width: '30%' }}>
									{quantity}
									<span style={{ color: '#999', padding: '0 10px' }}>x</span>
									<img
										style={{ width: '120px' }}
										src={`${baseUrl}${Gallery[0].url}`}
										alt={Title}
									/>
								</td>
								<td style={{ padding: '20px 0 20px 10px', width: '50%' }}>
									{Title}
								</td>
								<td style={{ padding: '20px 0 20px 10px', width: '20%' }}>
									{Price} * {quantity}
									{' = '}
									<span>{(Price * quantity).toFixed(2)}</span>
								</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot>
					<tr
						style={{
							borderBottomColor: '#e5e5e5',
							borderBottomStyle: 'solid',
							borderBottomWidth: '1px',
							borderCollapse: 'separate',
						}}>
						<td></td>
						<td style={{ padding: '20px 0 20px 10px' }}>Общая цена:</td>
						<td style={{ padding: '20px 0 20px 10px' }}>{totalPrice}</td>
					</tr>
				</tfoot>
			</table>
		);
	};

	const [userData, setUserData] = useState({
		FullName: '',
		Phone: '',
		Email: '',
		Address: '',
		ShippingType: '',
		ProductsPrice: totalPrice,
		ShippingPrice: shippingPrice,
		TotalPrice: totalPrice + shippingPrice,
		Payment: '',
		Comment: '',
		DateId: randomId,
		Products: ReactDOMServer.renderToStaticMarkup(<ProductsTableLoop />),
	});

	useEffect(() => {
		let localUser = localStorage.getItem('user');
		if (localStorage.getItem('user')) {
			setUserData({ ...JSON.parse(localUser), ...userData });
		}
	}, []);

	const { FullName, Phone, Email, Address, ShippingType, Payment, Comment } =
		userData;

	const handleChange = e => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const orderPostHandler = () => {
		setLoading(true);
		let data = { data: userData };
		const promise = axios
			.post('api/orders', data)
			.then(res => {
				setSubmitBtn(true);
				setLoading(false);
				localStorage.removeItem('cart');
				localStorage.setItem(
					'user',
					JSON.stringify({ FullName, Phone, Email, Address })
				);
				document.getElementById('order-form').reset();
			})
			.catch(err => {
				console.log(err);
			});

		// setTimeout(() => {
		//   setSubmitBtn(true);
		//   setLoading(false);
		//   console.log('Ordered');
		// }, 3000);

		// const promise = new Promise(function (resolve, reject) {
		//   // Setting 2000 ms time
		//   setTimeout(resolve, 2000);
		// });

		toast.promise(promise, {
			loading: 'Отправка заказа...',
			success: 'Заказ успешно отправлен',
			error: 'Что-то пошло не так, проверьте поля',
		});
	};

	const createUserHandler = event => {
		let invalidStyle = 'border: 1px solid #dc3545';
		let validStyle = 'border: 1px solid #198754;';
		event.preventDefault();
		if (
			FullName.trim().length === 0 ||
			Phone.trim().length === 0 ||
			Address.trim().length === 0 ||
			ShippingType.trim().length === 0 ||
			Payment.trim().length === 0
		) {
			if (FullName.trim().length === 0) {
				toast.error('Вы не заполнили поле ФИО!');
				event.target.FullName.style.cssText = invalidStyle;
			} else event.target.FullName.style.cssText = validStyle;
			if (Phone.trim().length === 0) {
				event.target.Phone.style.cssText = invalidStyle;
				toast.error('Вы не заполнили поле Телефон!');
			} else event.target.Phone.style.cssText = validStyle;
			if (Address.trim().length === 0) {
				toast.error('Вы не заполнили поле Адрес!');
				event.target.Address.style.cssText = invalidStyle;
			} else event.target.Address.style.cssText = validStyle;
			if (ShippingType.trim().length === 0) {
				toast.error('Вы не заполнили поле Доставки!');
				event.target.ShippingType.style.cssText = invalidStyle;
			} else event.target.ShippingType.style.cssText = validStyle;
			if (Payment.trim().length === 0) {
				toast.error('Вы не заполнили поле Оплаты!');
				event.target.Payment.style.cssText = invalidStyle;
			} else event.target.Payment.style.cssText = validStyle;
		} else {
			orderPostHandler();
		}
	};

	return (
		<div className='checkoutPage__feedback' id='checkout'>
			<div className='checkoutPage__feedback__title mb-5'>
				<h2>{!submitBtn && 'Данные покупателя'}</h2>
			</div>
			<div className='checkoutPage__feedback__form'>
				{!submitBtn ? (
					<form id='order-form' action='' onSubmit={createUserHandler}>
						<div className='contacts__content__left'>
							<div className='contacts__content__left__name mb-3'>
								<label
									htmlFor='exampleFormControlInput1'
									className='form-label mb-2'>
									Ф.И.О.
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleFormControlInput1'
									placeholder='Ф.И.О.'
									name='FullName'
									value={FullName}
									onChange={handleChange}
								/>
							</div>
							<div className='contacts__content__left__tel mb-3'>
								<label
									htmlFor='exampleFormControlInput1'
									className='form-label mb-2'>
									Номер телефона
								</label>
								<ReactInputMask
									mask='+\9\96 999 999 999'
									type='tel'
									className='form-control'
									id='exampleFormControlInput1'
									placeholder='Номер
                        телефона'
									name='Phone'
									value={Phone}
									onChange={handleChange}
								/>
							</div>
							<div className='contacts__content__left__eEmail mb-3'>
								<label
									htmlFor='exampleFormControlInput1'
									className='form-label mb-2'>
									Email Адрес
								</label>
								<input
									type='Email'
									className='form-control'
									id='exampleFormControlInput1'
									placeholder='Email@example.com (При заполнении почты на неё придёт чек)'
									name='Email'
									value={Email}
									onChange={handleChange}
								/>
							</div>
							<div className='contacts__content__left__Address mb-3'>
								<label htmlFor='inputAddress' className='form-label'>
									Адрес
								</label>
								<input
									type='text'
									className='form-control'
									placeholder='Проспект чуй 52'
									name='Address'
									value={Address}
									onChange={handleChange}
								/>
							</div>
							<div className='contacts__content__left__order mb-3'>
								<label htmlFor='validationCustom04' className='form-label'>
									Способ доставки
								</label>
								<select
									className='form-select'
									name='ShippingType'
									value={ShippingType}
									onChange={handleChange}>
									<option selected disabled value=''>
										Выбрать...
									</option>
									<option>Доставка курьером({shippingPrice})</option>
									<option>Самовывоз</option>
								</select>
							</div>
							<div className='contacts__content__left__Payment mb-3'>
								<label htmlFor='validationCustom04' className='form-label'>
									Способ оплаты
								</label>
								<select
									className='form-select'
									name='Payment'
									value={Payment}
									onChange={handleChange}>
									<option selected disabled value=''>
										Выбрать...
									</option>
									<option>Наличные курьеру</option>
									<option>Безналичная оплата</option>
								</select>
							</div>
							<div className='contacts__content__left__message'>
								<label
									htmlFor='exampleFormControlTextarea1'
									className='form-label mb-2'>
									Комментарии к заказу:
								</label>
								<textarea
									className='form-control'
									id='exampleFormControlTextarea1'
									placeholder='Комментарии к заказу'
									rows='3'
									name='Comment'
									value={Comment}
									onChange={handleChange}></textarea>
							</div>
						</div>
						<div className='shopping-cart-footer mt-5'>
							<div className='column'></div>
							<div className='column'>
								<button
									disabled={loading}
									type='submit'
									disabled={submitBtn}
									className={`btn btn-outline-${
										!loading ? 'primary' : 'secondary'
									}`}>
									Отправить заказ
								</button>
							</div>
						</div>
					</form>
				) : (
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
				)}
				<Toaster position='bottom-center' />
			</div>
		</div>
	);
};
