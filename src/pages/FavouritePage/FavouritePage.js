import { HandySvg } from 'handy-svg';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import empty from '../../assets/icons/empty.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import { Products } from '../CatalogPage/components/CatalogPageCards/CatalogPageCards';
import './FavouritePage.scss';

const FavouritePage = () => {
	const { favorite, user, setAuthModalOpen } = useContext(CustomContext);
	const [sortType, setSortType] = useState('priceInc');

	const handleLogin = () => {
		setAuthModalOpen(true);
	};
	
	// Сортировка избранных товаров
	const getSortedFavorites = () => {
		return [...favorite].sort((a, b) => {
			const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || 0);
			const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || 0);
			
			switch (sortType) {
				case 'priceInc':
					return priceA - priceB;
				case 'priceDec':
					return priceB - priceA;
				case 'priceDate':
					return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
				default:
					return 0;
			}
		});
	};

	return (
		<>
			<SEO
				SeoTitle='ProfiPackPlus - Избранное'
				SeoDescription='Ваши избранные в магазине Profipackplus'
			/>
			<div className='catalogPage favorites'>
				<div className='catalogPage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>Избранные</span>
					<h2>Избранные</h2>
				</div>
				
				{user ? (
					favorite.length !== 0 ? (
						<>
							<div className='catalogPage__mid'>
								<div></div>
								<div className='catalogPage__mid__select'>
									<select onChange={e => setSortType(e.target.value)}>
										<option value='priceInc'>По возрастанию цены</option>
										<option value='priceDec'>По убыванию цены</option>
										<option value='priceDate'>По дате</option>
									</select>
								</div>
							</div>
							<div className='catalogPage__content'>
								<div className='catalogPage__content__right'>
									<div className='catalogPage__content__right__cardsList'>
										{getSortedFavorites().map(item => (
											<Products key={item.id} data={item} />
										))}
									</div>
								</div>
							</div>
						</>
					) : (
						<div className='favouritePage__empty'>
							<div className='favouritePage__empty__bundle'>
								<span>
									<HandySvg src={empty} />
								</span>
							</div>
							<div className='favouritePage__empty__title'>
								Ваш список избранного пуст
							</div>
							<div className='favouritePage__empty__subtitle'>
								Добавляйте товары в избранное, чтобы просмотреть их позже
							</div>
							<div className='favouritePage__empty__back'>
								<Link to='/'>
									<button type='button' className='btn btn-outline-secondary'>
										Перейти в каталог
									</button>
								</Link>
							</div>
						</div>
					)
				) : (
					<div className='favouritePage__not-logged-in'>
						<div className='favouritePage__section'>
							<h3>Вы не авторизованы</h3>
							<p>Для доступа к избранным товарам необходимо войти в систему.</p>
							<button 
								className='btn btn-primary favouritePage__login-btn' 
								onClick={handleLogin}
							>
								ВОЙТИ В АККАУНТ
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default FavouritePage;
