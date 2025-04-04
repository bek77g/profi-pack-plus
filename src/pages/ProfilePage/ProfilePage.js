import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import ProfileDashboard from './ProfileDashboard';
import './ProfilePage.scss';

const ProfilePage = () => {
	const { user, setAuthModalOpen } = useContext(CustomContext);

	const handleLogin = () => {
		setAuthModalOpen(true);
	};

	return (
		<>
			<SEO
				SeoTitle='ProfiPackPlus - Личный кабинет'
				SeoDescription='Управление личными данными в магазине Profipackplus'
			/>
			<div className='profilePage'>
				<div className='profilePage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>Личный кабинет</span>
				</div>

				{user ? (
					<ProfileDashboard />
				) : (
					<div className='profilePage__not-logged-in'>
						<div className='profilePage__section'>
							<h3>Вы не авторизованы</h3>
							<p>Для доступа к личному кабинету необходимо войти в систему.</p>
							<button 
								className='btn btn-primary profilePage__login-btn' 
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

export default ProfilePage;
