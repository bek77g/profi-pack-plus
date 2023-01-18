import { Link } from 'react-router-dom';
import empty from '../../../assets/icons/empty.svg';
import { HandySvg } from 'handy-svg';

const CartPageEmpty = () => {
  return (
    <div className='cartPageEmpty'>
      <div className='cartPageEmpty__bundle'>
        <span>
          <HandySvg src={empty} />
        </span>
      </div>
      <div className='cartPageEmpty__title'>Ваша корзина пуста</div>
      <div className='cartPageEmpty__subtitle'>
        Самое время добавить в нее что-нибудь
      </div>
      <div className='cartPageEmpty__back'>
        <Link to='/'>
          <button type='button' className='btn btn-outline-secondary'>
            Перейти в каталог
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPageEmpty;
