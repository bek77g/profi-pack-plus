import axios from 'axios';
import { debounce } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CustomContext } from '../../../hoc/mainContentContext';

const OrganizationInfo = () => {
	const { user, setUser } = useContext(CustomContext);
	const [formData, setFormData] = useState({
		name: user?.organization?.name || '',
		inn: user?.organization?.inn || '',
		position: user?.organization?.position || '',
		comments: user?.organization?.comments || '',
	});

	const saveChanges = debounce(async data => {
		try {
			const response = await axios.patch('/api/profile/organization', data);
			setUser(prev => ({
				...prev,
				organization: response.data,
			}));
			toast.success('Изменения сохранены');
		} catch (error) {
			toast.error('Ошибка при сохранении');
			console.error('Error saving organization data:', error);
		}
	}, 1000);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => {
			const newData = { ...prev, [name]: value };
			saveChanges(newData);
			return newData;
		});
	};

	useEffect(() => {
		if (user?.organization) {
			setFormData({
				name: user.organization.name || '',
				inn: user.organization.inn || '',
				position: user.organization.position || '',
				comments: user.organization.comments || '',
			});
		}
	}, [user]);

	return (
		<div className='profile-section'>
			<div className='profile-section__form'>
				<div className='profile-section__group'>
					<label>Название компании</label>
					<input
						type='text'
						className='form-control'
						name='name'
						value={formData.name}
						onChange={handleChange}
						placeholder='Введите название компании'
					/>
				</div>

				<div className='profile-section__group'>
					<label>ИНН</label>
					<input
						type='text'
						className='form-control'
						name='inn'
						value={formData.inn}
						onChange={handleChange}
						placeholder='Введите ИНН'
					/>
				</div>
			</div>
		</div>
	);
};

export default OrganizationInfo;
