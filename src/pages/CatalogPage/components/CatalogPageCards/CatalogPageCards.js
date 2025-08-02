import { HandySvg } from 'handy-svg';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import cart from '../../../../assets/icons/cart.svg';
import heart from '../../../../assets/icons/favourite.svg';
import PaginationComp from '../../../../components/Pagination';
import { favsProduct, pagesHandler } from '../../../../hoc/Hooks';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { useSearchParamsState } from '../../../../hooks/useSearchParamsState';
import { Product } from '../../../../pages/MainPage/components/MainPagePopular/MainPagePopular';

export const ExProducts = ({ data }) => {
	const {
		baseUrl,
		addCart,
		addFav,
		removeFavorite,
		favorite: favoriteArr,
	} = useContext(CustomContext);
	const [count, setCount] = useState(1);
	const { pathname } = useLocation();

	const {
		Title,
		Slug,
		Price,
		Gallery,
		CountType,
		Availability,
		New,
		favorite,
		BestSeller,
		MinCount,
		...rest
	} = favsProduct(data, favoriteArr);

	const link =
		pathname.split('/').length >= 1 && rest?.sub_catalog
			? `/${pathname.split('/')[1]}/${rest?.sub_catalog.Slug}/${Slug}`
			: `/${Slug}`;

	const addToCart = () => {
		const result = addCart(data, count);
		if (!data.Availability) return null;
		if (result) toast.success('Товар добавлен в корзину');
	};
	const addToFav = () => {
		const result = favorite ? removeFavorite(data.id) : addFav(data);
		if (result)
			toast.success(
				favorite ? 'Товар удалён из избранных' : 'Товар добавлен в избранное'
			);
	};

	useEffect(() => setCount(MinCount), []);

	return (
		<div className='mainPagePopular__catalog__cards__card'>
			<div className='mainPagePopular__catalog__cards__card__tags'>
				{New && (
					<div className='mainPagePopular__catalog__cards__card__new'>
						Новинка
					</div>
				)}
				{BestSeller && (
					<div className='mainPagePopular__catalog__cards__card__hit'>Хит</div>
				)}
			</div>
			<div className='mainPagePopular__catalog__cards__card__heart'>
				<p
					className={`icon ${favorite ? 'active' : ''}`}
					onClick={() => addToFav()}>
					<p>
						<HandySvg width='24' height='24' src={heart} />
					</p>
				</p>
			</div>
			<div className='mainPagePopular__catalog__cards__card__img'>
				<Link to={link}>
					<img
						className='d-block w-100'
						style={{ minHeight: '198px' }}
						src={
							!!Gallery?.length
								? `${baseUrl}${Gallery[0].url}`
								: `https://via.placeholder.com/128x100.png?text=ProfiPackPlus+${Title}`
						}
						alt={Title}
					/>
				</Link>
			</div>
			<div className='mainPagePopular__catalog__cards__card__descr'>
				<Link to={link}>
					<h5>{Title}</h5>
				</Link>
				<div className='mainPagePopular__catalog__cards__card__cart'>
					<Link to={link}>
						<p style={{ lineHeight: '23px' }}>
							{Price} сом/{CountType}
							<br />
							<i style={{ fontStyle: 'initial', fontSize: '18px' }}>
								{(Price * count).toFixed(2)} сом
							</i>
						</p>
					</Link>
					<button onClick={() => addToCart()} disabled={!Availability}>
						<HandySvg src={cart} className='icon' width='30' height='30' />
					</button>
				</div>
				<div
					className={`catalogPagePopular__catalogs__cards__card__availability catalogPagePopular__catalogs__cards__card__availability--${
						Availability ? 'stock' : 'nonstock'
					}`}>
					{Availability ? 'В наличии' : 'Нет в наличии'}
				</div>
				<div className='catalogPagePopular__catalogs__cards__card__quantity'>
					<button
						type='button'
						className='btn btn-info'
						onClick={() =>
							setCount(count <= MinCount ? MinCount : count - MinCount)
						}>
						-
					</button>
					<input
						type='text'
						onKeyPress={e => !/[0-9]/.test(e.key) && e.preventDefault()}
						onChange={e => {
							let num = +e.target.value;
							setCount(num);
						}}
						className='form-control form-control-color'
						value={count}
						readOnly
					/>
					<button
						type='button'
						className='btn btn-info'
						onClick={() => setCount(count + MinCount)}>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

const CatalogPageCards = ({ products, sortType, minPrice, maxPrice }) => {
	const [page, setPage] = useSearchParamsState('page', { defaultValue: 1 });

	const showProducts = () => {
		let array = products
			.filter(product => {
				if (minPrice !== undefined && maxPrice !== undefined) {
					return product.Price >= minPrice && product.Price <= maxPrice;
				}
				return product;
			})
			.sort((a, b) => {
				if (sortType === 'priceInc') {
					return a.Price - b.Price;
				}
				if (sortType === 'priceDec') {
					return b.Price - a.Price;
				}
				if (sortType === 'priceDate') {
					return a.publishedAt - b.publishedAt;
				}
			})
			// .map(product => <Products key={product.id} data={product} />);
			.map(product => <Product key={product.id} data={product} />);
		return pagesHandler(array, 12, page);
	};

	return (
		<>
			<div className='catalogPagePopular__catalogs__cards'>
				{products && showProducts()}
			</div>
			{products.filter(product => {
				if (minPrice !== undefined && maxPrice !== undefined) {
					return product.Price >= minPrice && product.Price <= maxPrice;
				}
				return product;
			}).length >= 12 && (
				<PaginationComp
					setPage={setPage}
					page={page}
					pageSize={products.length}
				/>
			)}
		</>
	);
};

export default CatalogPageCards;
