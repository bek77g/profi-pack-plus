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

const OrganizationInfo = () => {
	const { user, setUser } = useContext(CustomContext);
	const [formData, setFormData] = useState({
		name: user?.organization?.name || '',
		inn: user?.organization?.inn || '',
		position: user?.organization?.position || '',
		comments: user?.organization?.comments || '',
	});

	// Референс для отслеживания первоначальной загрузки и ручных изменений
	const initialLoad = useRef(true);
	const formChanged = useRef(false);

	// Используем useCallback чтобы функция не пересоздавалась при каждом рендере
	const saveChanges = useCallback(
		debounce(async data => {
			try {
				const response = await axios.patch('/api/profile/organization', data);
				setUser(prev => ({
					...prev,
					organization: response.data,
				}));
				toast.success('Изменения сохранены');
				formChanged.current = false;
			} catch (error) {
				toast.error('Ошибка при сохранении');
				console.error('Error saving organization data:', error);
			}
		}, 1000),
		[setUser]
	);

	const handleChange = e => {
		const { name, value } = e.target;

		formChanged.current = true; // Отмечаем, что произошло ручное изменение

		setFormData(prev => ({
			...prev,
			[name]: value,
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
		if (user?.organization) {
			initialLoad.current = true; // Сбрасываем флаг при изменении данных организации
			formChanged.current = false; // Сбрасываем флаг изменений

			setFormData({
				name: user?.organization.name || '',
				inn: user?.organization.inn || '',
				position: user?.organization.position || '',
				comments: user?.organization.comments || '',
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
