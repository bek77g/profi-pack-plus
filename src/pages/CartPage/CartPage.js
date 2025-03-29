import CartPageEmpty from './components/CartPageEmpty';
import CartPageProducts from './components/CartPageProducts';

import { useContext, useEffect } from 'react';
import { CustomContext } from '../../hoc/mainContentContext';

const CartPage = () => {
	const { user, setAuthModalOpen } = useContext(CustomContext);

	useEffect(() => {
		if (!user) {
			setAuthModalOpen(true);
		} else {
			setAuthModalOpen(false);
		}
	}, [user, setAuthModalOpen]);

	return (
		<div className='cartPage'>
			{user ? <CartPageProducts /> : <CartPageEmpty />}
		</div>
	);
};

export default CartPage;
