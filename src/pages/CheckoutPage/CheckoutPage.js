import React from 'react';
import cart from "../../components/constants/cart";
import {HandySvg} from "handy-svg";
import remove from "../../assets/icons/remove.svg";
import {Link} from "react-router-dom";

const CheckoutPage = () => {

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
                            <span>1</span>
                        </div>
                    </td>
                    <td className="text-center text-lg text-medium">2800</td>
                    <td className="text-center text-lg text-medium">2800</td>
                </tr>
            </>
        )
    })

    return (
        <div className="checkoutPage">
            <div className="checkoutPage__wrapper">


                <div className="container padding-bottom-3x mb-1">
                    <div className="table-responsive shopping-cart">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Название продукта</th>
                                <th className="text-center">Количество</th>
                                <th className="text-center">Цена</th>
                                <th className="text-center">Общая цена</th>
                            </tr>
                            </thead>
                            <tbody>
                            {newCart}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0">Заказ</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Итоговая сумма
                                    <span>$53.98</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Кол-во продуктов
                                    <span>4</span>
                                </li>
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                </li>
                            </ul>

                            <button type="button" className="btn btn-primary btn-lg btn-block">
                                Отправить заказ
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="checkoutPage__feedback">
                <div className="checkoutPage__feedback__title mb-5">
                    <h2>
                        Данные покупателя
                    </h2>
                </div>
                <div className="checkoutPage__feedback__form">
                    <form action="">
                        <div className="contacts__content__left">
                            <div className="contacts__content__left__name mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Ф.И.О.</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Ф.И.О."/>
                            </div>
                            <div className="contacts__content__left__tel mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Номер
                                    телефона</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Номер
                        телефона"/>
                            </div>
                            <div className="contacts__content__left__email mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Email
                                    адрес</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Email@example.com"/>
                            </div>
                            <div className="contacts__content__left__address mb-3">
                                <label htmlFor="inputAddress" className="form-label">Адресс</label>
                                <input type="text" className="form-control"
                                       placeholder="Проспект чуй 52"/>
                            </div>
                            <div className="contacts__content__left__order mb-3">
                                <label htmlFor="validationCustom04" className="form-label">Способ доставки</label>
                                <select className="form-select">
                                    <option></option>
                                    <option>Доставка курьером(200 сом)</option>
                                    <option>Самовывоз</option>
                                </select>
                            </div>
                            <div className="contacts__content__left__payment mb-3">
                                <label htmlFor="validationCustom04" className="form-label">Способ оплаты</label>
                                <select className="form-select">
                                    <option></option>
                                    <option>Наличные курьеру</option>
                                    <option>Безналичная оплата</option>
                                </select>
                            </div>
                            <div className="contacts__content__left__message">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label mb-2">Комментарии к
                                    заказу:</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1"
                                          rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

            <div className="shopping-cart-footer mt-5">
                <div className="column">
                    <Link to="/">
                        <button type="button" className="btn btn-outline-secondary">
                            Назад на главную
                        </button>
                    </Link>
                </div>
                <div className="column">

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
