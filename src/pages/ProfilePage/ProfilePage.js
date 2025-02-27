import React from 'react';
import { Link } from 'react-router-dom';
import AddressInfo from './components/AddressInfo';
import OrganizationInfo from './components/OrganizationInfo';
import PersonalInfo from './components/PersonalInfo';
import SEO from '../../hoc/SEO';
import arr from '../../assets/icons/arr.svg';
import './ProfilePage.scss';

const ProfilePage = () => {
    return (
        <>
            <SEO
                SeoTitle="ProfiPackPlus - Личный кабинет"
                SeoDescription="Управление личными данными в магазине Profipackplus"
            />
            <div className="profilePage">
                <div className="breadcrumbs">
                    <Link to="/">
                        Главная 
                    </Link> / <span>Личный кабинет</span>
                </div>

                <div className="profilePage__sections">
                    <div className="profilePage__section">
                        <h3>Личная информация</h3>
                        <PersonalInfo />
                    </div>

                    <div className="profilePage__section">
                        <h3>Информация об организации</h3>
                        <OrganizationInfo />
                    </div>

                    <div className="profilePage__section">
                        <h3>Адреса доставки</h3>
                        <AddressInfo />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
