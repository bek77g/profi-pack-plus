import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CustomContext } from '../../../hoc/mainContentContext';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';

const PersonalInfo = () => {
    const { user, setUser } = useContext(CustomContext);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || ''
    });

    const saveChanges = debounce(async (data) => {
        try {
            const response = await axios.put('/api/users/me', data);
            setUser(response.data);
            toast.success('Изменения сохранены');
        } catch (error) {
            toast.error('Ошибка при сохранении');
            console.error('Error saving user data:', error);
        }
    }, 1000);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            saveChanges(newData);
            return newData;
        });
    };

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phoneNumber: user.phoneNumber || '',
                email: user.email || ''
            });
        }
    }, [user]);

    return (
        <div className="profile-section">
            <div className="profile-section__form">
                <div className="profile-section__group">
                    <label>Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Введите имя"
                    />
                </div>

                <div className="profile-section__group">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Введите фамилию"
                    />
                </div>

                <div className="profile-section__group">
                    <label>Номер телефона</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+7 (XXX) XXX-XX-XX"
                        disabled
                    />
                </div>

                <div className="profile-section__group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
