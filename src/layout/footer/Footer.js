import { HashLink } from 'react-router-hash-link';
import insta from '../../assets/icons/instagram.svg';
import vk from '../../assets/icons/vk.svg';
import facebook from '../../assets/icons/facebook.svg';
import youtube from '../../assets/icons/youtube.svg';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__content'>
          <div className='footer__content__messages'>
            <div className='footer__content__messages__title'>
              Подпишитесь на нашу рассылку и узнавайте о акция быстрее
            </div>
            <div className='footer__content__messages__input'>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='E-mail'
                />
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  id='button-addon2'>
                  Отправить
                </button>
              </div>
            </div>
          </div>
          <div className='footer__content__info'>
            <ul className='footer__content__info__items'>
              <li className='footer__content__info__items__item itemBold'>
                Информация
              </li>
              <li className='footer__content__info__items__item'>
                <HashLink smooth to='/about#top'>
                  {' '}
                  О компании
                </HashLink>
              </li>
              <li className='footer__content__info__items__item'>
                <HashLink smooth to='contacts#top'>
                  Контакты
                </HashLink>
              </li>
            </ul>
          </div>
          <div className='footer__content__shop'>
            <ul className='footer__content__shop__items'>
              <li className='footer__content__shop__items__item itemBold'>
                Интернет-магазин
              </li>
              <li className='footer__content__shop__items__item'>
                <HashLink smooth to='/order#top'>
                  Доставка и самовывоз
                </HashLink>
              </li>
              <li className='footer__content__shop__items__item'>
                <HashLink smooth to='/order#payment'>
                  Оплата
                </HashLink>
              </li>
            </ul>
          </div>
          <div className='footer__content__app'>
            <ul className='footer__content__app__items'>
              <li className='footer__content__app__items__item'>
                <a
                  href='https://www.instagram.com/profipackplus.kg/'
                  target='_blank'>
                  <img src={insta} alt='insta' /> <span>instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className='footer__content__sub'>
          <div className='footer__content__sub__item'>Договор оферты</div>
          <div className='footer__content__sub__item__politics'>
            Политика обработки персональных данных
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
