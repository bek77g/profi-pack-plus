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
            <section className="h-100 h-custom cartPage">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{borderRadius: "15px"}}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h2 className="fw-bold mb-0 text-black">Shopping Cart</h2>
                                                </div>
                                                <hr className="my-4"/>

                                                <div
                                                    className="row mb-4 d-flex justify-content-between align-items-center">
                                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                                            className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-3 cartPageText">
                                                        <h6 className="text-muted">Shirt</h6>
                                                        <h6 className="text-black mb-0">Cotton T-shirt</h6>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                        <div
                                                            className="catalogPagePopular__catalogs__cards__card__quantity pt-4">
                                                            <button type="button" className="btn btn-info">+</button>
                                                            <input type="text"
                                                                   className="form-control form-control-color"
                                                                   defaultValue={1}/>
                                                            <button type="button" className="btn btn-info">-</button>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText">
                                                        <h6 className="mb-0">€ 44.00</h6>
                                                    </div>

                                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end cartPageText">
                                                        <span>
                                                            <HandySvg src={remove} width="13" height="15"/>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="row mb-4 d-flex justify-content-between align-items-center">
                                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                                            className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-3 cartPageText">
                                                        <h6 className="text-muted">Shirt</h6>
                                                        <h6 className="text-black mb-0">Cotton T-shirt</h6>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                        <div
                                                            className="catalogPagePopular__catalogs__cards__card__quantity pt-4">
                                                            <button type="button" className="btn btn-info">+</button>
                                                            <input type="text"
                                                                   className="form-control form-control-color"
                                                                   defaultValue={1}/>
                                                            <button type="button" className="btn btn-info">-</button>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText">
                                                        <h6 className="mb-0">€ 44.00</h6>
                                                    </div>

                                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end cartPageText">
                                                        <span>
                                                            <HandySvg src={remove} width="13" height="15"/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 bg-grey d-flex align-items-center">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Заказ</h3>
                                                <hr className="my-4"/>

                                                <div className="d-flex justify-content-between mb-4">
                                                    <h5 className="text-uppercase">Количество :</h5>
                                                    <h5>3</h5>
                                                </div>

                                                <hr className="my-4"/>

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Итого:</h5>
                                                    <h5>137.00</h5>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

                </div>
                <div className="column">
                    <Link to="/checkout">
                        <button type="button"
                                className=" btn btn-outline-secondary">Отправить
                            заказ
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
