import React from 'react';
import { Link } from 'react-router-dom';
import arr from '../../assets/icons/arr.svg';
import SEO from '../../hoc/SEO';
import PersonalInfo from './components/PersonalInfo';
import OrganizationInfo from './components/OrganizationInfo';
import AddressInfo from './components/AddressInfo';
import './ProfilePage.scss';

const ProfilePage = () => {
    return (
        <>
            <SEO
                SeoTitle="ProfiPackPlus - Личный кабинет"
                SeoDescription="Управление личными данными в магазине Profipackplus"
            />
            <div className="profilePage">
                <div className="catalogPage__top">
                    <span>
                        <Link to="/">
                            Главная <img src={arr} alt="arr" />
                        </Link>
                    </span>
                    <span>Личный кабинет</span>
                    <h2>Личный кабинет</h2>
                </div>

                <div className="profilePage__sections">
                    <div className="profilePage__section">
                        <h3>Личные данные</h3>
                        <PersonalInfo />
                    </div>

                    <div className="profilePage__section">
                        <h3>Организация</h3>
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
