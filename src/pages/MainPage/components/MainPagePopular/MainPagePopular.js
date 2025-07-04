import axios from 'axios';
import { HandySvg } from 'handy-svg';
import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import cart from '../../../../assets/icons/cart.svg';
import heart from '../../../../assets/icons/favourite.svg';
import { favsProduct } from '../../../../hoc/Hooks';
import { CustomContext } from '../../../../hoc/mainContentContext';
import { useWindowDimensions } from '../../../../hooks/useWindowDimensions';

export const Product = ({ data }) => {
	const { pathname } = useLocation();
	const [count, setCount] = useState(1);
	const {
		baseUrl,
		addCart,
		addFav,
		removeFavorite,
		favorite: favoriteArr,
	} = useContext(CustomContext);

	const {
		Title,
		Discount,
		Price,
		New,
		Slug,
		Gallery,
		CountType,
		sub_catalog,
		favorite,
		Availability,
		BestSeller,
		MinCount,
	} = favsProduct(data, favoriteArr);

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

	// const fullLink = `${sub_catalog?.catalog.Slug}/${sub_catalog.Slug}/${Slug}`;

	const processedPathname = pathname.split('/').filter(Boolean);

	let fullLink = `/${Slug}`;

	if (sub_catalog?.catalog?.Slug) {
		fullLink = `/${sub_catalog.catalog.Slug}/${sub_catalog.Slug}/${Slug}`;
	} else if (sub_catalog && processedPathname.length >= 1) {
		fullLink = `/${processedPathname[0]}/${sub_catalog.Slug}/${Slug}`;
	} else if (sub_catalog) {
		fullLink = `/${sub_catalog.Slug}/${Slug}`;
	}

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
				{Discount && Discount > 0 ? (
					<div className='mainPagePopular__catalog__cards__card__discount'>
						-{Math.floor(((Discount - Price) / Discount) * 100)}%
					</div>
				) : null}
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
				<Link to={fullLink}>
					<img
						className='d-block w-100'
						src={`${baseUrl}${Gallery[0].url}`}
						alt={Title}
					/>
				</Link>
			</div>
			<div className='mainPagePopular__catalog__cards__card__descr'>
				<h5 title={Title}>
					<Link to={fullLink}>{Title} </Link>
				</h5>

				{Availability ? (
					<>
						<div className='mainPagePopular__catalog__cards__card__cart'>
							<Link to={fullLink}>
								<p style={{ lineHeight: '23px', display: 'grid' }}>
									<span className='mainPagePopular__catalog__cards__card__prevprice'>
										{Discount && Discount > 0
											? Discount + ' сом/' + CountType
											: null}
									</span>
									<span>
										{Price} сом/{CountType}
									</span>
								</p>
							</Link>
						</div>
						<div
							style={{ marginTop: '10px' }}
							className='catalogPagePopular__catalogs__cards__card__quantity'>
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
							<button
								className='mainPagePopular__catalog__cards__card__cart-btn'
								onClick={() => addToCart()}
								disabled={!Availability}>
								<HandySvg src={cart} className='icon' width='24' height='24' />
							</button>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '4px',
							}}>
							{/* <span
								style={{
									marginRight: '5px',
									whiteSpace: 'nowrap',
									fontSize: '11px',
									color: '#2f3035',
								}}>
								{count} {CountType} * {Price} ={' '}
							</span> */}
							<span
								style={{
									fontSize: '18px',
									fontWeight: 'bold',
								}}>
								{(Price * count).toFixed(2)} сом
							</span>
						</div>
					</>
				) : (
					<div className='catalogPagePopular__catalogs__cards__card__availability catalogPagePopular__catalogs__cards__card__availability--nonstock'>
						Нет в наличии
					</div>
				)}
			</div>
		</div>
	);
};

const MainPagePopular = () => {
	const { width } = useWindowDimensions();
	const [newProducts, setNewProducts] = useState([]);
	const [hitProducts, setHitProducts] = useState([]);
	const [slideSliceNew, setSlideSliceNew] = useState(0);
	const [slideSliceHit, setSlideSliceHit] = useState(0);
	const [showedCards, setShowedCards] = useState(4);

	useEffect(() => {
		axios(
			'/api/products?filters[New][$eq=true]&populate[Gallery][populate]=*&populate[ProductSEO][populate]=*&populate[sub_catalog][populate]=*'
		).then(({ data }) => setNewProducts(data.data));
		axios(
			'/api/products?filters[BestSeller][$eq=true]&populate[Gallery][populate]=*&populate[ProductSEO][populate]=*&populate[sub_catalog][populate]=*'
		).then(({ data }) => setHitProducts(data.data));
	}, []);
	const newCatalog = newProducts.map(elem => (
		<Product key={elem.id} data={elem} />
	));
	const hitCatalog = hitProducts.map(elem => (
		<Product key={elem.id} data={elem} />
	));
	function sliceSlides(array, slide_size, slide_number) {
		return array.slice(
			(slide_number - 1) * slide_size,
			slide_number * slide_size
		);
	}

	useEffect(() => {
		if (width <= 1084) {
			setShowedCards(2);
			setSlideSliceNew(Math.ceil(newProducts.length / 2));
			setSlideSliceHit(Math.ceil(hitProducts.length / 2));
			return;
		}
		if (width <= 544) {
			setShowedCards(1);
			setSlideSliceNew(newProducts.length);
			setSlideSliceHit(newProducts.length);
			return;
		}
		setSlideSliceNew(Math.ceil(newProducts.length / 4));
		setSlideSliceHit(Math.ceil(hitProducts.length / 4));
	}, [width, newProducts, hitProducts]);

	return (
		<>
			<div className='mainPagePopular'>
				<Carousel variant='dark'>
					{width > 544
						? [...Array(slideSliceNew).fill()].map((x, i) => {
								return (
									<Carousel.Item key={i}>
										<div className='mainPagePopular__catalog__cards'>
											{sliceSlides(newCatalog, showedCards, i + 1)}
										</div>
									</Carousel.Item>
								);
						  })
						: newProducts.map((card, i) => (
								<Carousel.Item key={i}>
									<div className='mainPagePopular__catalog__cards'>
										<Product key={card.id} data={card} />
									</div>
								</Carousel.Item>
						  ))}
				</Carousel>
			</div>
			{hitProducts.length > 0 && (
				<div className='mainPagePopular' style={{ marginTop: '20px' }}>
					<Carousel interval={'3000'} variant='dark'>
						{width > 544
							? [...Array(slideSliceHit).fill()].map((x, i) => {
									return (
										<Carousel.Item key={i}>
											<div className='mainPagePopular__catalog__cards'>
												{sliceSlides(hitCatalog, showedCards, i + 1)}
											</div>
										</Carousel.Item>
									);
							  })
							: hitProducts.map((card, i) => (
									<Carousel.Item key={i}>
										<div className='mainPagePopular__catalog__cards'>
											<Product key={card.id} data={card} />
										</div>
									</Carousel.Item>
							  ))}
					</Carousel>
				</div>
			)}
			<Toaster position='bottom-center' />
		</>
	);
};

export default MainPagePopular;
