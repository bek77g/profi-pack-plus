import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import { Product } from '../../pages/MainPage/components/MainPagePopular/MainPagePopular';
import './SaleDetailPage.scss';

const SaleDetailPage = () => {
	const { slug } = useParams();
	const { baseUrl } = useContext(CustomContext);
	const [sale, setSale] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isExpired, setIsExpired] = useState(false);

	useEffect(() => {
		const fetchPromotion = async () => {
			try {
				const response = await axios.get(
					`/api/promotions?filters[slug]=${slug}&populate=images&populate=products&populate=products.Gallery&populate=products.sub_catalog.catalog`
				);

				if (
					response.data &&
					response.data.data &&
					response.data.data.length > 0
				) {
					const item = response.data.data[0];

					let formattedExpireDate = 'Постоянная акция';
					let expired = false;
					if (item.endDate) {
						const date = new Date(item.endDate);
						formattedExpireDate = date.toLocaleDateString('ru-RU');
						expired = new Date() > date;
					}

					let imageUrl = 'https://via.placeholder.com/800x400';

					if (item.images && item.images.length > 0) {
						const format =
							item.images[0].formats?.medium ||
							item.images[0].formats?.small ||
							item.images[0].formats?.thumbnail;
						imageUrl = `${baseUrl}${format?.url || item.images[0].url}`;
					}

					const promotionData = {
						id: item.id,
						title: item.title,
						image: imageUrl,
						expireDate: formattedExpireDate,
						description: item.description || '',
						fullDescription: item.fullDescription || item.description,
						slug: item.slug,
						isExpired: expired,
					};

					setSale(promotionData);
					setIsExpired(expired);

					if (item.products && item.products.length > 0) {
						setRelatedProducts(item.products);
					} else {
						setRelatedProducts([]);
					}
				} else {
					setSale({
						title: 'Акция не найдена',
						description: 'Запрашиваемая акция не существует или была удалена.',
					});
					setRelatedProducts([]);
					console.error('Promotion not found for slug:', slug);
				}
			} catch (error) {
				console.error('Failed to fetch promotion details:', error);
				setSale({
					title: 'Ошибка загрузки',
					description:
						'Не удалось загрузить информацию об акции. Пожалуйста, попробуйте позже.',
				});
				setRelatedProducts([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPromotion();
	}, [slug, baseUrl]);

	if (isLoading) {
		return (
			<div className='saleDetailPage'>
				<div className='saleDetailPage__loading'>Загрузка...</div>
			</div>
		);
	}

	return (
		<>
			<SEO
				SeoTitle={`${sale?.title || 'Акция'} - Profi Pack Plus`}
				SeoDescription={sale?.description || 'Подробная информация об акции'}
			/>
			<div
				className={`saleDetailPage ${
					isExpired ? 'saleDetailPage--expired' : ''
				}`}>
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
					<span className='icon'>
						<Link to='/sale'>
							Акции и распродажи{' '}
							<span>
								<img src={arr} alt='arrow' />
							</span>
						</Link>
					</span>
					<span>{sale?.title}</span>
				</div>

				<div className='saleDetailPage__header'>
					<h1 className='saleDetailPage__title'>{sale?.title}</h1>
					{sale?.expireDate && (
						<div className='saleDetailPage__expire'>
							<FaCalendarAlt />
							<span>
								{isExpired
									? 'Акция завершена ' + sale.expireDate
									: sale.expireDate.includes('Постоянная')
									? sale.expireDate
									: `Действует до ${sale.expireDate}`}
							</span>
						</div>
					)}
					{isExpired && (
						<div className='saleDetailPage__expired-notice'>
							Данная акция завершена
						</div>
					)}
				</div>

				<div className='saleDetailPage__content'>
					{sale?.image && (
						<div className='saleDetailPage__image'>
							<img src={sale.image} alt={sale.title} />
						</div>
					)}

					<div className='saleDetailPage__description'>
						{sale?.fullDescription ? (
							<div dangerouslySetInnerHTML={{ __html: sale.fullDescription }} />
						) : (
							<p>{sale?.description}</p>
						)}
					</div>
				</div>

				{relatedProducts.length > 0 && (
					<div className='saleDetailPage__related'>
						<h2 className='saleDetailPage__related-title'>
							{isExpired ? 'Товары, участвовавшие в акции' : 'Товары по акции'}
						</h2>
						{isExpired && (
							<p className='saleDetailPage__related-note'>
								Акция завершена, но вы всё ещё можете ознакомиться с товарами,
								которые в ней участвовали
							</p>
						)}
						<div className='saleDetailPage__related-grid'>
							{relatedProducts.map(product => {
								return <Product key={product.id} data={product} />;
							})}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default SaleDetailPage;
