import React from 'react';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import SEO from '../../hoc/SEO';
import AddressInfo from './components/AddressInfo';
import OrganizationInfo from './components/OrganizationInfo';
import PersonalInfo from './components/PersonalInfo';
import './ProfilePage.scss';

const PersonalDataPage = () => {
	return (
		<>
			<SEO
				SeoTitle='ProfiPackPlus - Личные данные'
				SeoDescription='Управление личными данными в магазине Profipackplus'
			/>
			<div className='profilePage'>
				<div className='profilePage__top'>
					<span>
						<Link to='/'>
							Главная <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>
						<Link to='/profile'>
							Личный кабинет <img src={arr} alt='arr' />
						</Link>
					</span>
					<span>Личные данные</span>
				</div>

				<div className='profilePage__sections'>
					<div className='profilePage__section'>
						<h3>Личная информация</h3>
						<PersonalInfo />
					</div>

					<div className='profilePage__section'>
						<h3>Информация об организации</h3>
						<OrganizationInfo />
					</div>

					<div className='profilePage__section'>
						<h3>Адреса доставки</h3>
						<AddressInfo />
					</div>
					
					<div className='profilePage__back-btn'>
						<Link to='/profile' className='btn btn-secondary'>
							Вернуться назад
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default PersonalDataPage;
