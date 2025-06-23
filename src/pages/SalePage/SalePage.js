import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import './SalePage.scss';

const SalePage = () => {
	const { baseUrl } = useContext(CustomContext);
	const [activeSales, setActiveSales] = useState([]);
	const [expiredSales, setExpiredSales] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPromotions = async () => {
			try {
				const response = await axios.get('/api/promotions?populate=images');

				if (response.data && response.data.data) {
					const currentDate = new Date();
					const active = [];
					const expired = [];

					response.data.data.forEach(item => {
						let formattedExpireDate = 'Постоянная акция';
						let isExpired = false;
						let endDate = null;

						if (item.endDate) {
							endDate = new Date(item.endDate);
							formattedExpireDate = endDate.toLocaleDateString('ru-RU');
							isExpired = endDate < currentDate;
						}

						const formattedSale = {
							id: item.id,
							title: item.title,
							image:
								item.images && item.images.length > 0
									? `${baseUrl}${
											item.images[0].formats?.medium?.url || item.images[0].url
									  }`
									: 'https://via.placeholder.com/400x250',
							expireDate: formattedExpireDate,
							description: item.description || '',
							slug: item.slug || `promotion-${item.id}`,
							isExpired,
							endDate,
						};

						if (isExpired) {
							expired.push(formattedSale);
						} else {
							active.push(formattedSale);
						}
					});

					setActiveSales(active);
					setExpiredSales(expired);
				} else {
					setActiveSales([]);
					setExpiredSales([]);
				}
			} catch (error) {
				console.error('Failed to fetch promotions:', error);
				setActiveSales([]);
				setExpiredSales([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPromotions();
	}, [baseUrl]);

	return (
		<>
			<SEO
				SeoTitle='Акции и распродажи - Profi Pack Plus'
				SeoDescription='Специальные предложения, акции и распродажи на упаковочные материалы. Скидки до 50% на выбранные товары.'
			/>
			<div className='salePage'>
				<div
					className='catalogPageProducts__top'
					style={{ marginBottom: '30px' }}>
					<span className='icon'>
						<Link to='/'>
							Главная{' '}
							<span>
								<img src={arr} alt='arrow' />
							</span>
						</Link>
					</span>
					<span>Акции и распродажи</span>
				</div>
				<div className='salePage__header'>
					<h1 className='salePage__title'>Акции и распродажи</h1>
				</div>

				<div className='salePage__content'>
					{isLoading ? (
						<div className='salePage__loading'>Загрузка...</div>
					) : (
						<div className='salePage__grid'>
							{activeSales.length > 0 ? (
								activeSales.map(sale => (
									<div key={sale.id} className='salePage__item'>
										<Link
											to={`/sale/${sale.slug}`}
											className='salePage__item-link'>
											<div className='salePage__item-image'>
												<img src={sale.image} alt={sale.title} />
											</div>
											<div className='salePage__item-content'>
												<h3 className='salePage__item-title'>{sale.title}</h3>
												<div className='salePage__item-expire'>
													<FaCalendarAlt />
													<span>
														{sale.expireDate.includes('Постоянная')
															? sale.expireDate
															: `Действует до ${sale.expireDate}`}
													</span>
												</div>
											</div>
										</Link>
									</div>
								))
							) : (
								<div className='salePage__no-items'>
									Активных акций и распродаж пока нет
								</div>
							)}
						</div>
					)}
				</div>

				<div className='salePage__archive'>
					<h2 className='salePage__archive-title'>Завершенные акции</h2>
					{expiredSales.length > 0 ? (
						<div className='salePage__grid salePage__grid--expired'>
							{expiredSales.map(sale => (
								<div
									key={sale.id}
									className='salePage__item salePage__item--expired'>
									<Link
										to={`/sale/${sale.slug}`}
										className='salePage__item-link salePage__item-link--expired'>
										<div className='salePage__item-image'>
											<img src={sale.image} alt={sale.title} />
										</div>
										<div className='salePage__item-content'>
											<h3 className='salePage__item-title'>{sale.title}</h3>
											<div className='salePage__item-expire'>
												<FaCalendarAlt />
												<span>Акция завершена {sale.expireDate}</span>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					) : (
						<p>Список завершенных акций пуст.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default SalePage;
