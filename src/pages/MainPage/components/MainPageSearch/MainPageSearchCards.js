import axios from 'axios';
import { HandySvg } from 'handy-svg';
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import arr from '../../../../assets/icons/arr.svg';
import { CustomContext } from '../../../../hoc/mainContentContext';

const MainPageSearchCards = () => {
	const { baseUrl, MainPageData } = useContext(CustomContext);
	const [cards, setCards] = useState([]);
	useEffect(() => {
		MainPageData.listofCategories[0] !== undefined &&
			axios
				.get(
					`/api/catalogs?filters[Slug][$eqi]=${MainPageData.listofCategories[0].SlugOfCategory}&filters[Slug][$eqi]=${MainPageData.listofCategories[1].SlugOfCategory}&filters[Slug][$eqi]=${MainPageData.listofCategories[2].SlugOfCategory}&filters[Slug][$eqi]=${MainPageData.listofCategories[3].SlugOfCategory}&filters[Slug][$eqi]=${MainPageData.listofCategories[4].SlugOfCategory}&filters[Slug][$eqi]=${MainPageData.listofCategories[5].SlugOfCategory}&populate=Icon&populate=sub_catalogs`
				)
				.then(({ data }) => setCards(data.data));
	}, [MainPageData.listofCategories]);

	const showCatalogs = () => {
		return cards.map(({ Title, Slug, Icon, sub_catalogs, id }) => {
			return (
				<div className='mainPageSearchCards__card' key={id}>
					<div className='mainPageSearchCards__card__left'>
						<h2 className='mainPageSearchCards__card__left__title'>
							<Link to={Slug}>{Title}</Link>
						</h2>
						<p className='mainPageSearchCards__card__left__quantity'>
							Размер каталога: {sub_catalogs.length}
						</p>
						<div className='mainPageSearchCards__card__left__btn'>
							<Link to={Slug}>
								Подробнее{' '}
								<HandySvg src={arr} className='icon' width='6' height='9' />
							</Link>
						</div>
					</div>
					<div className='mainPageSearchCards__card__right'>
						<img className='image' src={`${baseUrl}${Icon.url}`} alt='img' />
					</div>
				</div>
			);
		});
	};

	const showCatalogsSkeleton = () => {
		return [...Array(6)].map((el, idx) => {
			return (
				<div className='mainPageSearchCards__card' key={idx}>
					<div
						className='mainPageSearchCards__card__left'
						style={{ width: '100%' }}>
						<h2 className='mainPageSearchCards__card__left__title'>
							<Link to='/'>
								<Skeleton height='58px' />
							</Link>
						</h2>
						<p className='mainPageSearchCards__card__left__quantity'>
							<Skeleton height='28px' />
						</p>
						<div className='mainPageSearchCards__card__left__btn'>
							<Link to='/'>
								<Skeleton width='86px' height='18px' />
							</Link>
						</div>
					</div>
					<div
						className='mainPageSearchCards__card__right'
						style={{ width: '100%', height: '100%', textAlign: 'right' }}>
						<Skeleton className='image' width='100%' height='100%' />
					</div>
				</div>
			);
		});
	};

	return (
		<div className='mainPageSearchCards'>
			{!!cards.length ? showCatalogs() : showCatalogsSkeleton()}
		</div>
	);
};

export default MainPageSearchCards;
