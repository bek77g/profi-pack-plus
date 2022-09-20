import React from 'react';
import arr from "../../assets/icons/arr.svg";
import Form from 'react-bootstrap/Form';
import CatalogPageCards from "./components/CatalogPageCards/CatalogPageCards";

const CatalogPage = () => {
    return (
        <div className="catalogPage">
            <div className="catalogPage__top">
                <span>Главная <img src={arr} alt=""/></span>
                <span>Каталог</span>
                <h2>Каталог</h2>
            </div>
            <div className="catalogPage__mid">
                <div></div>
                <div className="catalogPage__mid__select">
                    <select name="" id="">
                        <option value="1">По популярности</option>
                        <option value="1">По цене</option>
                        <option value="1">По дате</option>
                    </select>
                </div>
            </div>
            <div className="catalogPage__content">
                <div className="catalogPage__content__left">
                    <span>Параметры</span>
                    <div className="catalogPage__content__left__price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Range/>
                        от 100.000 до 500.000
                    </div>
                </div>
                <div className="catalogPage__content__right">
                    <CatalogPageCards/>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
