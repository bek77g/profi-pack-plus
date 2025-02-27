import axios from 'axios';
import { debounce } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CustomContext } from '../../../hoc/mainContentContext';

const AddressInfo = () => {
	const { user, setUser } = useContext(CustomContext);
	const [addresses, setAddresses] = useState(user?.addresses || []);
	const [newAddress, setNewAddress] = useState({
		type: 'home',
		title: '',
		street: '',
		building: '',
		apartment: '',
		floor: '',
		entrance: '',
		isDefault: false,
	});

	const saveAddress = debounce(async (address, id) => {
		try {
			let response;
			if (id) {
				// Update existing address
				response = await axios.patch(`/api/profile/addresses/${id}`, address);
			} else {
				// Create new address
				response = await axios.post('/api/profile/addresses', address);
			}

			const updatedAddresses = id
				? addresses.map(addr => (addr.id === id ? response.data : addr))
				: [...addresses, response.data];

			setAddresses(updatedAddresses);
			setUser(prev => ({
				...prev,
				addresses: updatedAddresses,
			}));

			toast.success(id ? 'Адрес обновлен' : 'Адрес добавлен');

			if (!id) {
				setNewAddress({
					type: 'home',
					title: '',
					street: '',
					building: '',
					apartment: '',
					floor: '',
					entrance: '',
					isDefault: false,
				});
			}
		} catch (error) {
			toast.error('Ошибка при сохранении адреса');
			console.error('Error saving address:', error);
		}
	}, 1000);

	const handleAddressChange = (e, id) => {
		const { name, value, type, checked } = e.target;
		const fieldValue = type === 'checkbox' ? checked : value;

		if (id) {
			// Editing existing address
			const address = addresses.find(addr => addr.id === id);
			if (address) {
				const updatedAddress = { ...address, [name]: fieldValue };
				saveAddress(updatedAddress, id);
			}
		} else {
			// Adding new address
			setNewAddress(prev => ({
				...prev,
				[name]: fieldValue,
			}));
		}
	};

	const handleAddNewAddress = e => {
		e.preventDefault();
		if (!newAddress.street || !newAddress.building || !newAddress.title) {
			toast.error('Заполните обязательные поля');
			return;
		}
		saveAddress(newAddress);
	};

	const handleDeleteAddress = async id => {
		try {
			await axios.delete(`/api/profile/addresses/${id}`);
			const updatedAddresses = addresses.filter(addr => addr.id !== id);
			setAddresses(updatedAddresses);
			setUser(prev => ({
				...prev,
				addresses: updatedAddresses,
			}));
			toast.success('Адрес удален');
		} catch (error) {
			toast.error('Ошибка при удалении адреса');
			console.error('Error deleting address:', error);
		}
	};

	useEffect(() => {
		if (user?.addresses) {
			setAddresses(user.addresses);
		}
	}, [user]);

	const renderAddressForm = (address, id = null) => (
		<div className='profile-section__address' key={id || 'new'}>
			<div className='profile-section__group'>
				<label>Тип адреса</label>
				<select
					className='form-select'
					name='type'
					value={address.type}
					onChange={e => handleAddressChange(e, id)}
					required>
					<option value='home'>Дом</option>
					<option value='work'>Работа</option>
					<option value='delivery'>Доставка</option>
				</select>
			</div>

			<div className='profile-section__group'>
				<label>Название адреса</label>
				<input
					type='text'
					className='form-control'
					name='title'
					value={address.title}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Например: Дом, Офис'
					required
				/>
			</div>

			<div className='profile-section__group'>
				<label>Улица</label>
				<input
					type='text'
					className='form-control'
					name='street'
					value={address.street}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите улицу'
					required
				/>
			</div>

			<div className='profile-section__group'>
				<label>Номер дома</label>
				<input
					type='text'
					className='form-control'
					name='building'
					value={address.building}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите номер дома'
					required
				/>
			</div>

			<div className='profile-section__group'>
				<label>Квартира/офис</label>
				<input
					type='text'
					className='form-control'
					name='apartment'
					value={address.apartment}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите номер квартиры/офиса'
				/>
			</div>

			<div className='profile-section__group'>
				<label>Этаж</label>
				<input
					type='number'
					name='floor'
					value={address.floor}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите этаж'
				/>
			</div>

			<div className='profile-section__group'>
				<label>Подъезд</label>
				<input
					type='text'
					className='form-control'
					name='entrance'
					value={address.entrance}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите номер подъезда'
				/>
			</div>

			<div className='profile-section__group profile-section__group--checkbox'>
				<label>
					<input
						type='checkbox'
						name='isDefault'
						checked={address.isDefault}
						onChange={e => handleAddressChange(e, id)}
					/>
					Адрес по умолчанию
				</label>
			</div>

			{id && (
				<button
					className='profile-section__delete'
					onClick={() => handleDeleteAddress(id)}>
					Удалить адрес
				</button>
			)}
		</div>
	);

	return (
		<div className='profile-section'>
			<div className='profile-section__addresses'>
				{addresses.map(address => renderAddressForm(address, address.id))}
			</div>

			<div className='profile-section__new-address'>
				<h4>Добавить новый адрес</h4>
				{renderAddressForm(newAddress)}
				<button className='profile-section__add' onClick={handleAddNewAddress}>
					Добавить адрес
				</button>
			</div>
		</div>
	);
};

export default AddressInfo;
