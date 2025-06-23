import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import './SalePage.scss';

const SalePage = () => {
	const { baseUrl } = useContext(CustomContext);
	const [sales, setSales] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPromotions = async () => {
			try {
				const response = await axios.get('/api/promotions?populate=images');

				if (response.data && response.data.data) {
					const formattedSales = response.data.data.map(item => {
						let formattedExpireDate = 'Постоянная акция';
						if (item.endDate) {
							const date = new Date(item.endDate);
							formattedExpireDate = date.toLocaleDateString('ru-RU');
						}

						return {
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
						};
					});
					setSales(formattedSales);
				} else {
					setSales([]);
				}
			} catch (error) {
				console.error('Failed to fetch promotions:', error);
				setSales([]);
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
				<div className='salePage__header'>
					<h1 className='salePage__title'>Акции и распродажи</h1>
				</div>

				<div className='salePage__content'>
					{isLoading ? (
						<div className='salePage__loading'>Загрузка...</div>
					) : (
						<div className='salePage__grid'>
							{sales.length > 0 ? (
								sales.map(sale => (
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
					<p>Список завершенных акций пуст.</p>
				</div>
			</div>
		</>
	);
};

export default SalePage;
