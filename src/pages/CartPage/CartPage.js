import React from 'react';
import CartPageEmpty from "./components/CartPageEmpty";
import CartPageProducts from "./components/CartPageProducts";

const CartPage = () => {
    return (
        <div className="cartPage">
            {/*<CartPageEmpty/>*/}
            <CartPageProducts/>
        </div>
    );
};

export default CartPage;
