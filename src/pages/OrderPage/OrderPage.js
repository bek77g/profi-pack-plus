import ReactMarkdown from 'react-markdown';
import SEO from '../../hoc/SEO';
import { HandySvg } from 'handy-svg';
import arr from '../../assets/icons/arr.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CustomContext } from '../../hoc/mainContentContext';
import Loading from '../../layout/loading/Loading';

const OrderPage = () => {
  const { OrderPageData } = useContext(CustomContext);
  const { OrderPageSEO, PickupInfo, PaymentInfo } = OrderPageData;
  return (
    <>
      <SEO
        SeoTitle={OrderPageSEO?.SeoTitle || 'ProfiPackPlus - Доставка'}
        SeoDescription={OrderPageSEO?.SeoDescription || 'Описание доставки'}
      />
      <div className='order'>
        <div className='order__top'>
          <Link to='/'>
            Главная{' '}
            <span>
              <HandySvg src={arr} width='6' height='9' />
            </span>
          </Link>
          <span>Доставка</span>
        </div>
        <div id='pickup' className='order__title'>
          <h2>Условия доставки</h2>
        </div>
        <div className='order__self'>
          <h2>Самовывоз</h2>
          {PickupInfo !== '' ? (
            <ReactMarkdown children={PickupInfo} />
          ) : (
            <Loading />
          )}
        </div>
        <div id='payment' className='order__payment'>
          <h2>Способы оплаты товаров и услуг</h2>
          {PaymentInfo !== '' ? (
            <ReactMarkdown children={PaymentInfo} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
