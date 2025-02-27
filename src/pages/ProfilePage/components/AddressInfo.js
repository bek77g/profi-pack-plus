import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CustomContext } from '../../../hoc/mainContentContext';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';

const AddressInfo = () => {
    const { user, setUser } = useContext(CustomContext);
    const [addresses, setAddresses] = useState(user?.addresses || []);
    const [newAddress, setNewAddress] = useState({
        title: '',
        street: '',
        city: '',
        postalCode: '',
        isDefault: false
    });

    const saveAddress = debounce(async (address, index) => {
        try {
            let response;
            if (address.id) {
                // Update existing address
                response = await axios.put(`/api/users/me/addresses/${address.id}`, address);
            } else {
                // Create new address
                response = await axios.post('/api/users/me/addresses', address);
            }
            
            const updatedAddresses = [...addresses];
            if (index !== undefined) {
                updatedAddresses[index] = response.data;
            } else {
                updatedAddresses.push(response.data);
            }
            
            setAddresses(updatedAddresses);
            setUser(prev => ({
                ...prev,
                addresses: updatedAddresses
            }));
            
            toast.success('Адрес сохранен');
            
            // Reset new address form if this was a new address
            if (index === undefined) {
                setNewAddress({
                    title: '',
                    street: '',
                    city: '',
                    postalCode: '',
                    isDefault: false
                });
            }
        } catch (error) {
            toast.error('Ошибка при сохранении адреса');
            console.error('Error saving address:', error);
        }
    }, 1000);

    const handleAddressChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (index !== undefined) {
            // Editing existing address
            const updatedAddresses = [...addresses];
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [name]: fieldValue
            };
            setAddresses(updatedAddresses);
            saveAddress(updatedAddresses[index], index);
        } else {
            // Adding new address
            setNewAddress(prev => ({
                ...prev,
                [name]: fieldValue
            }));
        }
    };

    const handleAddNewAddress = (e) => {
        e.preventDefault();
        if (!newAddress.street || !newAddress.city) {
            toast.error('Заполните обязательные поля');
            return;
        }
        saveAddress(newAddress);
    };

    const handleDeleteAddress = async (addressId, index) => {
        try {
            await axios.delete(`/api/users/me/addresses/${addressId}`);
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(updatedAddresses);
            setUser(prev => ({
                ...prev,
                addresses: updatedAddresses
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

    const renderAddressForm = (address, index) => (
        <div className="profile-section__address" key={address.id || 'new'}>
            <div className="profile-section__group">
                <label>Название адреса</label>
                <input
                    type="text"
                    name="title"
                    value={address.title}
                    onChange={(e) => handleAddressChange(e, index)}
                    placeholder="Например: Дом, Офис"
                />
            </div>

            <div className="profile-section__group">
                <label>Улица и номер дома</label>
                <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={(e) => handleAddressChange(e, index)}
                    placeholder="Введите улицу и номер дома"
                />
            </div>

            <div className="profile-section__group">
                <label>Город</label>
                <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={(e) => handleAddressChange(e, index)}
                    placeholder="Введите город"
                />
            </div>

            <div className="profile-section__group">
                <label>Почтовый индекс</label>
                <input
                    type="text"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={(e) => handleAddressChange(e, index)}
                    placeholder="Введите почтовый индекс"
                />
            </div>

            <div className="profile-section__group profile-section__group--checkbox">
                <label>
                    <input
                        type="checkbox"
                        name="isDefault"
                        checked={address.isDefault}
                        onChange={(e) => handleAddressChange(e, index)}
                    />
                    Адрес по умолчанию
                </label>
            </div>

            {index !== undefined && (
                <button
                    className="profile-section__delete"
                    onClick={() => handleDeleteAddress(address.id, index)}
                >
                    Удалить адрес
                </button>
            )}
        </div>
    );

    return (
        <div className="profile-section">
            <div className="profile-section__addresses">
                {addresses.map((address, index) => renderAddressForm(address, index))}
            </div>

            <div className="profile-section__new-address">
                <h4>Добавить новый адрес</h4>
                {renderAddressForm(newAddress)}
                <button
                    className="profile-section__add"
                    onClick={handleAddNewAddress}
                >
                    Добавить адрес
                </button>
            </div>
        </div>
    );
};

export default AddressInfo;
