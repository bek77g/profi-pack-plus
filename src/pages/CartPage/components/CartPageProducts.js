import React, {useState} from 'react';
import {HandySvg} from "handy-svg";
import remove from "../../../assets/icons/remove.svg";
import cart from "../../../components/constants/cart";
import {Link} from "react-router-dom";
import heart from "../../../assets/icons/favourite.svg";
import {toast, Toaster} from "react-hot-toast";

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

const CartPageProducts = () => {

    const [count, setCount] = useState(1);

    const removeItem = () => {
        toast.success("Товар удалён из корзины");
    }

    return (
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

                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-2 col-lg-2 col-xl-2 cartImg">
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
                                                        <button type="button" className="btn btn-info"
                                                                onClick={() => setCount(count - 1)}>-
                                                        </button>
                                                        <input type="number" className="form-control form-control-color"
                                                               value={count}/>
                                                        <button type="button" className="btn btn-info"
                                                                onClick={() => setCount(count + 1)}>+
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText">
                                                    <h6 className="mb-0">€ 44.00</h6>
                                                </div>

                                                <div
                                                    className="col-md-1 col-lg-1 col-xl-1 text-end cartPageText cartRemove">
                                                <span onClick={() => removeItem()}>
                                                    <HandySvg src={remove} width="13" height="15"/>
                                                </span>
                                                </div>
                                            </div>
                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-2 col-lg-2 col-xl-2 cartImg">
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
                                                        <button type="button" className="btn btn-info"
                                                                onClick={() => setCount(count - 1)}>-
                                                        </button>
                                                        <input type="number" className="form-control form-control-color"
                                                               value={count}/>
                                                        <button type="button" className="btn btn-info"
                                                                onClick={() => setCount(count + 1)}>+
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText">
                                                    <h6 className="mb-0">€ 44.00</h6>
                                                </div>

                                                <div
                                                    className="col-md-1 col-lg-1 col-xl-1 text-end cartPageText cartRemove">
                                                <span onClick={() => removeItem()}>
                                                    <HandySvg src={remove} width="13" height="15"/>
                                                </span>
                                                </div>
                                            </div>

                                            <div className="pt-5">
                                                <div className="column cartPageBtn">
                                                    <Link to="/catalog">
                                                        <button type="button" className="btn btn-primary">
                                                            Назад в каталог
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 bg-grey d-flex align-items-center">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Заказ</h3>
                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="">Количество: </h5>
                                                <h5>3</h5>
                                            </div>

                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="">Итого:</h5>
                                                <h5>137.00</h5>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <div className="column">
                                                    <Link to="/checkout">
                                                        <button type="button"
                                                                className=" btn btn-outline-secondary">Оформить заказ
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Toaster/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPageProducts;
{/*<div className="shopping-cart-footer">*/
}
{/*    <div className="column text-lg">Итого: <span className="text-medium">35000</span></div>*/
}
{/*</div>*/
}
{/*<div className="shopping-cart-footer">*/
}
{/*    <div className="column">*/
}
{/*        <Link to="/catalog">*/
}
{/*            <button type="button" className="btn btn-outline-secondary">*/
}
{/*                Назад в каталог*/
}
{/*            </button>*/
}
{/*        </Link>*/
}
{/*    </div>*/
}
{/*    <div className="column">*/
}
{/*        <Link to="/checkout">*/
}
{/*            <button type="button" className="btn btn-primary">Оформить заказ</button>*/
}
{/*        </Link>*/
}
{/*    </div>*/
}
{/*</div>*/
}
