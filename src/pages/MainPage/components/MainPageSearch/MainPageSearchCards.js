import React from 'react';
import {HandySvg} from 'handy-svg';
import {Link} from 'react-router-dom';
import search from '../../../../components/constants';
import arr from '../../../../assets/icons/arr.svg';

const MainPageSearchCards = () => {
    const newSearch = search.map((elem) => {
        return (
            <div className='mainPageSearchCards__card'>
                <div className='mainPageSearchCards__card__left'>
                    <h2 className='mainPageSearchCards__card__left__title'>
                        {elem.name}
                    </h2>
                    <p className='mainPageSearchCards__card__left__quantity'>
                        Количество товаров: {elem.quantity}
                    </p>
                    <div className='mainPageSearchCards__card__left__btn'>
                        <Link to='/category'>
                            Подробнее{' '}
                            <HandySvg src={arr} className='icon' width='6' height='9'/>
                        </Link>
                    </div>
                </div>
                <div className='mainPageSearchCards__card__right'>
                    <img src={elem.img} alt='img'/>
                </div>
            </div>
        );
    });

    return <div className='mainPageSearchCards'>{newSearch}</div>;
};

export default MainPageSearchCards;
