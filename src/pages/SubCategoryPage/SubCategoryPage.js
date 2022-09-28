import React from 'react';
import heart from "../../assets/icons/favourite.svg";
import cart from '../../assets/icons/cart.svg';
import secondCatalog from '../../components/constants/secondCatalog';
import PaginationComp from '../../components/Pagination';
import {Link} from 'react-router-dom';
import {HandySvg} from 'handy-svg';
import arr from "../../assets/icons/arr.svg";
import Form from "react-bootstrap/Form";
import CatalogPageCards from "../CatalogPage/components/CatalogPageCards/CatalogPageCards";

const SubCategoryPage = () => {
    const newCatalog = secondCatalog.map((elem) => {
        return (
            <>
                <div className='catalogPagePopular__catalogs__cards__card cartCategory'>
                    <div className='catalogPagePopular__catalogs__cards__card__img'>
                        <Link to='/cards'>
                            <img className='d-block w-100' src={elem.img} alt='First slide'/>
                        </Link>
                    </div>
                    <div className='catalogPagePopular__catalogs__cards__card__descr'>
                        <Link to='/products'>
                            <h5>{elem.description}</h5>
                        </Link>
                    </div>
                </div>
            </>
        );
    });

    return (
        <>
            <div className='catalogPage'>
                <div className='catalogPage__top'>
          <span>
            Главная <img src={arr} alt=''/>
          </span>
                    <span>Каталог <img src={arr} alt=''/></span>
                    <span>Салфетки</span>
                    <h2>Салфетки</h2>
                </div>
                <div className='catalogPage__mid'>
                    <div></div>
                    <div className='catalogPage__mid__select'>
                        <select name='' id=''>
                            <option value='1'>По популярности</option>
                            <option value='1'>По цене</option>
                            <option value='1'>По дате</option>
                        </select>
                    </div>
                </div>
                <div className='catalogPage__content'>
                    <div className='catalogPage__content__left'>
                        <span>Параметры</span>
                        <div className='catalogPage__content__left__price'>
                            <Form.Label>Цена</Form.Label>
                            <Form.Range/>
                            от 100.000 до 500.000
                        </div>
                    </div>
                    <div className='catalogPage__content__right'>
                        <div className='catalogPagePopular__catalogs__cards'>{newCatalog}</div>
                        <PaginationComp/>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SubCategoryPage;

