import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../hoc/mainContentContext';
import './ProductCard.scss';

const ProductCard = ({ item }) => {
    const { addCart, removeFavorite } = useContext(CustomContext);

    return (
        <div className="product-card">
            <div className="product-card__favorite">
                <button 
                    onClick={() => removeFavorite(item.id)}
                    className="product-card__favorite-button"
                >
                    ×
                </button>
            </div>
            <Link to={`/product/${item.id}`} className="product-card__link">
                <div className="product-card__image">
                    <img src={item.image} alt={item.name} />
                </div>
                <h4 className="product-card__title">{item.name}</h4>
                <div className="product-card__bottom">
                    <div className="product-card__price">
                        <span>{item.price} сом</span>
                    </div>
                    <button 
                        className="button button--outline button--add"
                        onClick={(e) => {
                            e.preventDefault();
                            addCart(item);
                        }}
                    >
                        <span>+ Добавить</span>
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
