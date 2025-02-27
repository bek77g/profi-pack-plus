import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CustomContext } from '../../../hoc/mainContentContext';

const AddressInfo = () => {
	const { user, setUser } = useContext(CustomContext);
	const [addresses, setAddresses] = useState(user?.addresses || []);
	const [showNewAddressForm, setShowNewAddressForm] = useState(
		!addresses.length
	);
	const [newAddress, setNewAddress] = useState({
		type: 'house',
		title: '',
		street: '',
		building: '',
		apartment: '',
		floor: null,
		entrance: '',
		isDefault: false,
	});

	// Create a memoized version of the save function
	const debouncedSave = useCallback(
		debounce(async address => {
			try {
				let response;
				if (address.id) {
					await axios.patch(`/api/profile/addresses/${address.id}`, address);
				} else if (
					address.street &&
					address.building &&
					address.title &&
					address.type
				) {
					await axios.post('/api/profile/addresses', {
						...address,
						floor: parseInt(address.floor) || null,
					});
				} else {
					// Если не все обязательные поля заполнены, не отправляем запрос
					return;
				}

				// Refresh data after successful save
				const { data: updatedProfile } = await axios.get('/api/profile');
				setAddresses(updatedProfile.addresses);
				setUser(prev => ({
					...prev,
					addresses: updatedProfile.addresses,
				}));

				if (!address.id) {
					// После успешного создания нового адреса
					setShowNewAddressForm(false);
					// Очищаем форму нового адреса
					setNewAddress({
						type: 'house',
						title: '',
						street: '',
						building: '',
						apartment: '',
						floor: null,
						entrance: '',
						isDefault: false,
					});
				}

				toast.success(address.id ? 'Адрес обновлен' : 'Адрес добавлен');
			} catch (error) {
				console.error('Error saving address:', error);
				toast.error('Ошибка при сохранении');
			}
		}, 1000),
		[]
	);

	const handleAddressChange = (e, id) => {
		const { name, value, type, checked } = e.target;
		let fieldValue = type === 'checkbox' ? checked : value;

		if (name === 'floor') {
			fieldValue = parseInt(value, 10) || null;
		}

		if (id) {
			const address = addresses.find(addr => addr.id === id);
			if (address) {
				const updatedAddress = { ...address, [name]: fieldValue };
				setAddresses(prevAddresses =>
					prevAddresses.map(addr => (addr.id === id ? updatedAddress : addr))
				);
				debouncedSave(updatedAddress);
			}
		} else {
			const updatedNewAddress = {
				...newAddress,
				[name]: fieldValue,
			};
			setNewAddress(updatedNewAddress);
			debouncedSave(updatedNewAddress);
		}
	};

	const handleDeleteAddress = async id => {
		try {
			await axios.delete(`/api/profile/addresses/${id}`);
			const { data: updatedProfile } = await axios.get('/api/profile');

			const updatedAddresses = updatedProfile.addresses;
			setAddresses(updatedAddresses);
			setUser(prev => ({
				...prev,
				addresses: updatedAddresses,
			}));

			// Если удалили последний адрес, показываем форму
			if (updatedAddresses.length === 0) {
				setShowNewAddressForm(true);
			}

			toast.success('Адрес удален');
		} catch (error) {
			console.error('Error deleting address:', error);
			toast.error('Ошибка при удалении адреса');
		}
	};

	useEffect(() => {
		if (user?.addresses) {
			setAddresses(user.addresses);
			// Если адресов нет, показываем форму
			setShowNewAddressForm(!user.addresses.length);
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
					<option value='house'>Дом</option>
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
					value={address.apartment || ''}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите номер квартиры/офиса'
				/>
			</div>

			<div className='profile-section__group'>
				<label>Этаж</label>
				<input
					type='number'
					className='form-control'
					name='floor'
					value={address.floor || ''}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите этаж'
					min='1'
					max='100'
				/>
			</div>

			<div className='profile-section__group'>
				<label>Подъезд</label>
				<input
					type='text'
					className='form-control'
					name='entrance'
					value={address.entrance || ''}
					onChange={e => handleAddressChange(e, id)}
					placeholder='Введите номер подъезда'
				/>
			</div>

			<div className='profile-section__group profile-section__group--checkbox'>
				<label>
					<input
						type='checkbox'
						className='form-check-input'
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
				{showNewAddressForm ? (
					<>{renderAddressForm(newAddress)}</>
				) : (
					<button
						className='profile-section__add'
						onClick={() => setShowNewAddressForm(true)}>
						Добавить адрес
					</button>
				)}
			</div>
		</div>
	);
};

export default AddressInfo;
