import React, { useContext } from 'react';
import { CustomContext } from '../../hoc/mainContentContext';
import './CartItem.scss';

const CartItem = ({ item }) => {
    const { removeCart, editCart } = useContext(CustomContext);

    const handleQuantityChange = (amount) => {
        if (item.quantity + amount <= 0) {
            removeCart(item.id);
        } else {
            editCart(item.id, item.quantity + amount);
        }
    };

    return (
        <div className="cart-item">
            <div className="cart-item__img">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item__info">
                <h3>{item.name}</h3>
                <p className="cart-item__price">{item.price} сом</p>
            </div>
            <div className="cart-item__count">
                <button 
                    className="cart-item__count-minus"
                    onClick={() => handleQuantityChange(-1)}
                >
                    -
                </button>
                <b>{item.quantity}</b>
                <button 
                    className="cart-item__count-plus"
                    onClick={() => handleQuantityChange(1)}
                >
                    +
                </button>
            </div>
            <div className="cart-item__total">
                <b>{item.price * item.quantity} сом</b>
            </div>
            <div 
                className="cart-item__remove"
                onClick={() => removeCart(item.id)}
            >
                ×
            </div>
        </div>
    );
};

export default CartItem;
