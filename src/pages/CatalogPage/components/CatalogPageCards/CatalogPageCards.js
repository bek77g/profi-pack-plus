import React, {useState} from 'react';
import heart from '../../../../assets/icons/favourite.svg';
import cart from '../../../../assets/icons/cart.svg';
import secondCatalog from '../../../../components/constants/secondCatalog';
import PaginationComp from '../../../../components/Pagination';
import {Link} from 'react-router-dom';
import {HandySvg} from 'handy-svg';
import catalog from "../../../../components/constants/catalog";

const Products = (props) => {
    const [count, setCount] = useState(1);

    return (
        <div className='mainPagePopular__catalog__cards__card'>
            <div className='mainPagePopular__catalog__cards__card__heart'>
                <img src={heart} alt='heart'/>
            </div>
            <div className='mainPagePopular__catalog__cards__card__img'>
                <Link to='/products'>
                    <img className='d-block w-100' src={props.data.img} alt='First slide'/>
                </Link>
            </div>
            <div className='mainPagePopular__catalog__cards__card__descr'>
                <Link to='/products'>
                    <h5>{props.data.description}</h5>
                </Link>
                <div className='mainPagePopular__catalog__cards__card__cart'>
                    <Link to='/products'>
                        <p>{props.data.price}</p>
                    </Link>
                    <span>
              <HandySvg src={cart} className='icon' width='30' height='30'/>
            </span>
                </div>
                <div className='catalogPagePopular__catalogs__cards__card__quantity'>
                    <button type='button' className='btn btn-info' onClick={() => setCount(count - 1)}>
                        -
                    </button>
                    <input
                        type='number'
                        className='form-control form-control-color'
                        value={count}
                    />
                    <button type='button' className='btn btn-info' onClick={() => setCount(count + 1)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

const CatalogPageCards = () => {
    const newCatalog = secondCatalog.map(elem => <Products data={elem}/>);

    return (
        <>
            <div className='catalogPagePopular__catalogs__cards'>{newCatalog}</div>
            <PaginationComp/>
        </>
    );
};

export default CatalogPageCards;
