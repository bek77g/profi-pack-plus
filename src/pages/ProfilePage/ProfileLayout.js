import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import { CustomContext } from '../../hoc/mainContentContext';
import SEO from '../../hoc/SEO';
import './ProfilePage.scss';

const ProfileLayout = () => {
	const { logout, user, setAuthModalOpen } = useContext(CustomContext);
	const location = useLocation();

	const handleLogin = () => {
		setAuthModalOpen(true);
	};

	const isActiveLink = (path) => {
		return location.pathname === path;
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
					<div className='profilePage__container'>
						<div className='profilePage__sidebar'>
							<h3>Мой аккаунт</h3>
							<ul className='profilePage__nav'>
								<li>
									<Link 
										to='/profile' 
										className={isActiveLink('/profile') ? 'active' : ''}
									>
										Личные данные
									</Link>
								</li>
								<li>
									<Link 
										to='/profile/orders' 
										className={isActiveLink('/profile/orders') ? 'active' : ''}
									>
										История заказов
									</Link>
								</li>
								<li>
									<button className='btn btn-danger' onClick={logout}>
										ВЫЙТИ
									</button>
								</li>
							</ul>
						</div>
						<div className='profilePage__content'>
							<Outlet />
						</div>
					</div>
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

export default ProfileLayout;
