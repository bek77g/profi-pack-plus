import React from 'react';
import AddressInfo from './components/AddressInfo';
import OrganizationInfo from './components/OrganizationInfo';
import PersonalInfo from './components/PersonalInfo';

const ProfileHome = () => {
	return (
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
		</div>
	);
};

export default ProfileHome;
