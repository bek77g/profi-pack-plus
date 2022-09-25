import React, {useState} from 'react';
import {HandySvg} from "handy-svg";
import remove from "../../../assets/icons/remove.svg";
import cart from "../../../components/constants/cart";
import {Link} from "react-router-dom";

const CartPageProducts = () => {

    const newCart = cart.map(elem => {
        return (
            <>
                <tr>
                    <td>
                        <div className="product-item">
                            <div className="product-info d-flex justify-content-around align-items-center">
                                <img
                                    src={elem.img} alt="Product"/>
                                <h4 className="product-title">{elem.name}</h4>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="count-input">
                            <input type="number" className="form-control text-center" defaultValue={1}/>
                        </div>
                    </td>
                    <td className="text-center text-lg text-medium">2800</td>
                    <td className="text-center text-lg text-medium">2800</td>
                    <td className="text-center">
               <span>
                   <HandySvg src={remove} width="13" height="15"/>
               </span>
                    </td>
                </tr>
            </>
        )
    })

    return (
        <div className="cartPageProducts">
            <div className="container padding-bottom-3x mb-1">
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Название продукта</th>
                            <th className="text-center">Количество</th>
                            <th className="text-center">Цена</th>
                            <th className="text-center">Общая цена</th>
                            <th className="text-center">
                                <button type="button" className="btn btn-outline-danger">Очистить карту</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {newCart}
                        </tbody>
                    </table>
                </div>

                <div className="shopping-cart-footer">
                    <div className="column text-lg">Итого: <span className="text-medium">35000</span></div>
                </div>
                <div className="shopping-cart-footer">
                    <div className="column">
                        <Link to="/catalog">
                            <button type="button" className="btn btn-outline-secondary">
                                Назад в каталог
                            </button>
                        </Link>
                    </div>
                    <div className="column">
                        <Link to="/checkout">
                            <button type="button" className="btn btn-primary">Оформить заказ</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageProducts;
