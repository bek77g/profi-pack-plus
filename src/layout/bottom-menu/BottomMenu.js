import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HandySvg } from 'handy-svg';
import { CustomContext } from '../../hoc/mainContentContext';

// Import icons
import homeIcon from '../../assets/icons/home.svg';
import cartIcon from '../../assets/icons/cart.svg';
import favouriteIcon from '../../assets/icons/favourite.svg';
import catalogIcon from '../../assets/icons/catalog.svg';
import userIcon from '../../assets/icons/user.svg';

const BottomMenu = () => {
  const { cart } = useContext(CustomContext);

  return (
    <div className="bottom-menu">
      <div className="bottom-menu__container">
        <Link to="/" className="bottom-menu__item">
          <div className="bottom-menu__icon">
            <HandySvg src={homeIcon} width="24" height="24" alt="home" />
          </div>
          <span className="bottom-menu__text">Главная</span>
        </Link>
        
        <Link to="/catalog" className="bottom-menu__item">
          <div className="bottom-menu__icon">
            <HandySvg src={catalogIcon} width="24" height="24" alt="catalog" />
          </div>
          <span className="bottom-menu__text">Каталог</span>
        </Link>
        
        <Link to="/cart" className="bottom-menu__item">
          <div className="bottom-menu__icon">
            <HandySvg src={cartIcon} width="24" height="24" alt="cart" />
            {cart.length !== 0 && (
              <span className="bottom-menu__badge">{cart.length}</span>
            )}
          </div>
          <span className="bottom-menu__text">Корзина</span>
        </Link>
        
        <Link to="/favourite" className="bottom-menu__item">
          <div className="bottom-menu__icon">
            <HandySvg src={favouriteIcon} width="24" height="24" alt="favourite" />
          </div>
          <span className="bottom-menu__text">Избранное</span>
        </Link>
        
        <Link to="/profile" className="bottom-menu__item">
          <div className="bottom-menu__icon">
            <HandySvg src={userIcon} width="24" height="24" alt="profile" />
          </div>
          <span className="bottom-menu__text">Профиль</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomMenu;
