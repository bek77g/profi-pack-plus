import { Link } from 'react-router-dom';

const NotFounf = () => {
  return (
    <div className='cartPageEmpty'>
      <div className='cartPageEmpty__bundle'>
        <span>not found</span>
      </div>
      <div className='cartPageEmpty__title'>404</div>
      <div className='cartPageEmpty__subtitle'>Проверьте адресс страницы</div>
      <div className='cartPageEmpty__back'>
        <Link to='/'>
          <button type='button' className='btn btn-outline-secondary'>
            Главная
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFounf;
