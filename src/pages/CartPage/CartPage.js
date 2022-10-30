import React from 'react';
import CartPageProducts from './components/CartPageProducts';

const CartPage = () => {
  return (
    <div className='cartPage'>
      {/*<CartPageEmpty/>*/}
      <CartPageProducts />
    </div>
  );
};

export default CartPage;
