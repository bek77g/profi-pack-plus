import axios from 'axios';
import { debounce } from 'lodash';
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import toast from 'react-hot-toast';
import { CustomContext } from '../../../hoc/mainContentContext';

const PersonalInfo = () => {
	const { user, setUser } = useContext(CustomContext);
	const [formData, setFormData] = useState({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		phoneNumber: user?.phoneNumber || '',
		isAdult: user?.isAdult || false,
		gender: user?.gender || 'male',
	});

	// Референс для отслеживания первоначальной загрузки и ручных изменений
	const initialLoad = useRef(true);
	const formChanged = useRef(false);

	// Используем useCallback чтобы функция не пересоздавалась при каждом рендере
	const saveChanges = useCallback(
		debounce(async data => {
			try {
				const response = await axios.patch('/api/profile/personal', data);
				setUser(prev => ({
					...prev,
					...response.data,
				}));
				toast.success('Изменения сохранены');
				formChanged.current = false;
			} catch (error) {
				toast.error('Ошибка при сохранении');
				console.error('Error saving user data:', error);
			}
		}, 1000),
		[setUser]
	);

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;

		formChanged.current = true; // Отмечаем, что произошло ручное изменение

		setFormData(prev => ({
			...prev,
			[name]: newValue,
		}));
		// Здесь не вызываем saveChanges
	};

	// Отслеживаем изменения formData и вызываем saveChanges после обновления состояния
	useEffect(() => {
		// Пропускаем первый рендер и отправляем запрос только при ручных изменениях
		if (initialLoad.current) {
			initialLoad.current = false;
			return;
		}

		if (formChanged.current && user) {
			saveChanges(formData);
		}
	}, [formData, saveChanges, user]);

	useEffect(() => {
		if (user) {
			initialLoad.current = true; // Сбрасываем флаг при изменении пользователя
			formChanged.current = false; // Сбрасываем флаг изменений

			setFormData({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				phoneNumber: user.phoneNumber || '',
				isAdult: user.isAdult || false,
				gender: user.gender || 'male',
			});
		}
	}, [user]);

	return (
		<div className='profile-section'>
			<div className='profile-section__form'>
				<div className='profile-section__group'>
					<label>Имя</label>
					<input
						type='text'
						className='form-control'
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						placeholder='Введите имя'
						required
					/>
				</div>

				<div className='profile-section__group'>
					<label>Фамилия</label>
					<input
						type='text'
						className='form-control'
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						placeholder='Введите фамилию'
						required
					/>
				</div>

				<div className='profile-section__group'>
					<label>Номер телефона</label>
					<input
						type='tel'
						className='form-control'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleChange}
						placeholder='+996 (XXX) XXX-XX-XX'
						required
					/>
				</div>

				<div className='profile-section__group'>
					<label>Пол</label>
					<select
						name='gender'
						className='form-select'
						value={formData.gender}
						onChange={handleChange}
						required>
						<option value='male'>Мужской</option>
						<option value='female'>Женский</option>
					</select>
				</div>

				<div className='profile-section__group profile-section__group--checkbox'>
					<label>
						<input
							type='checkbox'
							className='form-check-input'
							name='isAdult'
							checked={formData.isAdult}
							onChange={handleChange}
							required
						/>
						Подтверждаю, что мне есть 18 лет
					</label>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
