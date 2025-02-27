import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { CustomContext } from '../../hoc/mainContentContext';

const FavouritePage = () => {
	const { favorite, user, setAuthModalOpen } = useContext(CustomContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			setAuthModalOpen(true);
		}
	}, [user, setAuthModalOpen]);

	if (!user) {
		return null;
	}

	return (
		<section className='favourite'>
			<div className='container'>
				<h2>Избранное</h2>
				{favorite.length ? (
					<div className='favourite__content'>
						{favorite.map(item => (
							<ProductCard key={item.id} item={item} />
						))}
					</div>
				) : (
					<div className='favourite__empty'>
						<h2>
							Список избранного пуст <span>😕</span>
						</h2>
						<p>
							Вы пока ничего не добавили в избранное.
							<br />
							Для того, чтобы добавить товар, перейдите на главную страницу.
						</p>
						<button
							className='button button--black'
							onClick={() => navigate('/')}>
							<span>Вернуться назад</span>
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default FavouritePage;
